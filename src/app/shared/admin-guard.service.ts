import { CanLoad, Route} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(private authService: AuthService) {}
  canLoad(route: Route): Observable<boolean> {
    // Check for locked in user
    if (!this.authService.afAuth.auth.currentUser) {
      console.log('no user object');
      return Observable.of(false);
    }else {
      console.log('we have a logged in User');
      // let test;
      return this.authService.isAdmin().take(1);
      // console.log(test);
      // return test;
      // return true;

    }
    // return true;
  //   if (!this.authService.afAuth.auth.currentUser) {
  //     console.log(false);
  //     return false;
  //   }
  //   this.authService.isAdmin$().subscribe(x => console.log(x[0].isAdmin$));
  //   return this.authService.isAdmin$().map(data => {
  //     console.log(data[0].isAdmin$);
  //     // return true;
  //     return data[0].isAdmin$;
  //   });
  }
}
