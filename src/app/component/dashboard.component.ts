import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../app.types';

@Component({
  selector: 'app-dashboard',
  template: `
    <h3>Your name is {{ user?.firstname }} {{ user?.lastname }}</h3>
  `
})
export class DashboardComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
