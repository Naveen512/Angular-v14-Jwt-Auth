import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    
    this.authService.getAccessToken();
    var userProfile = this.authService.userProfile.getValue();

    if ((userProfile?.sub ?? 0) > 0) {
      if (route.data['requiredAuth'] && route.data['requiredAuth'] == false) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } else {
      if (route.data['requiredAuth'] && route.data['requiredAuth'] == true) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
  }
}
