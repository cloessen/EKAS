import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authService.getAuthState()) {
      return false;
    } else {
      return this.authService.getAuthState().pipe(map(data => !!data.uid));
    }
  }
}
