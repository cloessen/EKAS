import { CanLoad, Route} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(private authService: AuthService) {}

  canLoad(route: Route) {
    return this.authService.isAdmin().map(data => data[0].isAdmin );
  }
}
