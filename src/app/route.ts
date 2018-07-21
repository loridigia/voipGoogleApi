import {Route} from '@angular/router';
import {DashboardComponent} from './component/dashboard.component';
import {LayoutComponent} from './component/layout.component';
import {LoginComponent} from './component/login.component';
import {AuthGuard} from './guard/auth.guard';

export const routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: LayoutComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'tickets', loadChildren: 'app/modules/tickets/tickets.module#TicketsModule'},
      {path: 'todos', loadChildren: 'app/modules/todos/todos.module#TodosModule'},
      {path: 'contacts', loadChildren: 'app/modules/contacts/contacts.module#ContactsModule'}
    ], canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  }
] as Route[];
