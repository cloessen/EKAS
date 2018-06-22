import { CanLoad, Route} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(private authService: AuthService) {}
  canLoad(route: Route): Observable<boolean> {
    // Check for locked in user
    if (!this.authService._afAuth.auth.currentUser) {
      console.log('no user object');
      return Observable.create(false);
    }else {
      console.log('we have a logged in User');
      // TODO: rewrite for production!!!!!!!!!!
      // return this.authService.isAdmin().take(1);
      return Observable.create(true);
    }
  }
}
