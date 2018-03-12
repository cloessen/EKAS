import { AuthService } from './../shared/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdminSubscription: Subscription;
  isAdmin = false;

  constructor(public _authService: AuthService) { }

  ngOnInit() {
    this.isAdminSubscription = this._authService.isAdmin().subscribe((data) => this.isAdmin = data[0].isAdmin);
  }
  onSubmitLogout() {
    this._authService.logout();
  }
  ngOnDestroy() {
    this.isAdminSubscription.unsubscribe();
  }

}
