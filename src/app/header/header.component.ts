import { AuthService } from './../shared/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  isAdmin$: Observable<boolean>;

  constructor(public _authService: AuthService) { }

  ngOnInit() {
    this.isAdmin$ = this._authService.isAdmin();
    // this.isAdminSubscription = this._authService.isAdmin$().subscribe((data) => this.isAdmin$ = data[0].isAdmin$);
  }
  onSubmitLogout() {
    this._authService.logout();
  }
  ngOnDestroy() {
    // this.isAdminSubscription.unsubscribe();
  }

}
