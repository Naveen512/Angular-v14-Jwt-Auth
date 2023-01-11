import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenModel } from './token-model';
import { UserProfile } from './user-profile';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('Login') > -1 || req.url.indexOf('refreshtoken') > -1) {
      return next.handle(req);
    }

    const localStorageTokens = localStorage.getItem('tokens');
    var token: TokenModel;
    if (localStorageTokens) {
      token = JSON.parse(localStorageTokens) as TokenModel;
      var isTokenExpired = this.jwtHelper.isTokenExpired(token?.accessToken);
      if (!isTokenExpired) {
        return next.handle(req);
      } else {
        return this.authService.refreshToken(token).pipe(
          switchMap((newTokens: TokenModel) => {
            localStorage.setItem('tokens', JSON.stringify(newTokens));
            var userInfo = this.jwtHelper.decodeToken(
              newTokens.accessToken
            ) as UserProfile;
            this.authService.userProfile.next(userInfo);
            const transformedReq = req.clone({
              headers: req.headers.set(
                'Authorization',
                `bearer ${newTokens.accessToken}`
              ),
            });
            return next.handle(transformedReq);
          })
        );
      }
    }
    this.router.navigate(['/']);
    return throwError(() => 'Invalid call');
  }
}
