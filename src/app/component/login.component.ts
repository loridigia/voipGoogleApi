import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  template: `

    <div class="container">
      <div class="row m-xl-5">
        <div class="col-md-4 offset-md-4">
          <form #f="ngForm" (ngSubmit)="doLogin()">

            <div class="form-group">
              <label for="username">Username</label>
              <input [(ngModel)]="username" type="text"
                     class="form-control"
                     name="username"
                     id="username"
                     placeholder="Username" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input [(ngModel)]="password"
                     name="password"
                     type="password" class="form-control" id="password" placeholder="Password" required>
            </div>
            <button [disabled]="!f.valid"
                    type="submit"
                    class="btn btn-default">Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  public constructor(
    private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authService.isAuhtenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  public doLogin() {
    this.authService.login(this.username, this.password)
      .then((user) => {
        if (user !== null) {
          this.router.navigate(['/dashboard']);
          return;
        }
        console.log('User is null: ');
        console.log(user);
      })
      .catch((err) => console.log(err));
  }

}
