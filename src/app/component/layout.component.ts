import {Component} from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `


    <nav class="navbar navbar-expand-md navbar-dark bg-info fixed-top">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <app-menu></app-menu>
      </div>
    </nav>

    <main role="main" class="container p-lg-5 m-lg-5">

      <router-outlet></router-outlet>

    </main>


  `
})
export class LayoutComponent {


}
