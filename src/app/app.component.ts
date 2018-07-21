import {Component, ViewEncapsulation} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  template: `
    <toaster-container [toasterconfig]="configToaster"></toaster-container>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'User App';

  public configToaster: ToasterConfig = new ToasterConfig({
    animation: 'fade'
  });

}
