import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(private authService: AuthenticationService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isAuhtenticated()) {
      return next.handle(req.clone({
        setHeaders:
          {Authorization: 'Bearer ' + this.authService.getToken()}
      }));
    }

    return next.handle(req);
  }

}
