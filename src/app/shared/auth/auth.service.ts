import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { LoginModel } from 'src/app/auth/login-model';
import { TokenModel } from './token-model';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  userProfile = new BehaviorSubject<UserProfile | null>(null);
  jwtService: JwtHelperService = new JwtHelperService();

  getAccessToken(): string {
    var localStorageToken = localStorage.getItem('tokens');
    if (localStorageToken) {
      var token = JSON.parse(localStorageToken) as TokenModel;
      var isTokenExpired = this.jwtService.isTokenExpired(token.access_token);
      if (isTokenExpired) {
        this.userProfile.next(null);
        return '';
      }
      var userInfo = this.jwtService.decodeToken(
        token.access_token
      ) as UserProfile;
      this.userProfile.next(userInfo);
      return token.access_token;
    }
    return '';
  }

  userLogin(payload: LoginModel) {
    return this.httpClient
      .post('http://localhost:3000/auth/login', payload)
      .pipe(
        map((data) => {
          var token = data as TokenModel;

          localStorage.setItem('tokens', JSON.stringify(token));

          var userInfo = this.jwtService.decodeToken(
            token.access_token
          ) as UserProfile;

          this.userProfile.next(userInfo);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  refreshToken(payload: TokenModel) {
    return this.httpClient.post<TokenModel>(
      'http://localhost:3000/auth/refreshtoken',
      payload
    );
  }
}
