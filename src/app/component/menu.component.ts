import {Component, ViewEncapsulation} from '@angular/core';
import {Menu} from '../app.types';
import {APP_MENU} from '../app.menu';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  template: `
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" *ngFor="let m of menu">
        <a class="dropdown-item"
           [routerLinkActive]="'active'"
           [routerLink]="m.link">{{ m.text }}</a>
      </li>
    </ul>
  `
})
export class MenuComponent {

  public menu: Menu[] = [];

  public constructor() {
    this.menu = APP_MENU;
  }
}
