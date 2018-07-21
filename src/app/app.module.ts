import {InjectionToken, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {LayoutComponent} from './component/layout.component';
import {DashboardComponent} from './component/dashboard.component';
import {RouterModule} from '@angular/router';

import {routes} from './route';
import {TicketService} from './services/ticket.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TodoService} from './services/todo.service';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {TodoResolver} from './resolver/todo.resolver';
import {AuthenticationService} from './services/authentication.service';
import {BsDropdownModule} from 'ngx-bootstrap';
import {MenuComponent} from './component/menu.component';
import {LoginComponent} from './component/login.component';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './guard/auth.guard';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';
import {environment} from '../environments/environment';

export const MY_TOKEN: InjectionToken<string> =
  new InjectionToken<string>('MY_TOKEN');


// configure google api library
const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.gapiClientId,
  discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
  fetch_basic_profile: true,
  cookie_policy: 'single_host_origin',
  ux_mode: 'popup',
  scope: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/contacts.readonly'
  ].join(' ')
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes),
    ToasterModule,
    FormsModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [
    TicketService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
    {
      provide: MY_TOKEN,
      useValue: 'testValue'
    },
    TodoService,
    TodoResolver,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
