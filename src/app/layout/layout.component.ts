import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/index';
import * as firebase from 'firebase/app';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../Store/app.reducer';
import { SetCurrentFF } from '../Store/Basic/basic.actions';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  authState$: Observable<firebase.User>;
  // public routeSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    // private _UI: UIService,
    // private _route: ActivatedRoute,
    // private _store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.authState$ = this._authService.getAuthState();
    // this.routeSubscription = this._route.params.subscribe(params => this._store.dispatch(new SetCurrentFF(params.ff)));
  }
}
