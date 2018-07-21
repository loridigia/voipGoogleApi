import {Injectable, Injector} from '@angular/core';
import {User} from '../app.types';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  private user: User | null = null;
  private baseUrl = environment.javaBackendUrl;

  public constructor(private injector: Injector) {
  }

  public logout() {
    this.user = null;
  }

  public login(username: string, password: string): Promise<User | null> {

    this.user = {firstname: 'Giorgio', lastname: 'Santini', token: '1234', username: 'gsantini'};
    return Promise.resolve(this.user);

    /*
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.injector.get(HttpClient).post<User | null>
    (this.baseUrl + '/login',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .map((user) => {
        this.user = user;
        return user;
      })
      .toPromise(); */
  }

  public getUser(): User | null {
    return this.user;
  }

  public getToken(): string | null {
    return this.user ? this.user.token : null;
  }

  public isAuhtenticated(): boolean {
    /* fake */
    this.login('','');
    return this.user !== null;
  }

}
