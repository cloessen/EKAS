import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authService.getAuthState()) {
      return false;
    } else {
      return this.authService.getAuthState().map(data => !!data.uid);
    }
  }
}
