import { AuthService } from './../shared/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../Store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin$: Observable<boolean>;
  currentff$: Observable<string>;

  constructor(
    public _authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAdmin$ = this._authService.isAdmin();
    this.currentff$ = this.store.select(fromRoot.getCurrentFF);
    // this.isAdminSubscription = this._authService.isAdmin$().subscribe((data) => this.isAdmin$ = data[0].isAdmin$);
  }
  onSubmitLogout() {
    this._authService.logout();
  }
  ngOnDestroy() {
    // this.isAdminSubscription.unsubscribe();
  }

}
