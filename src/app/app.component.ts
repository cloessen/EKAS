import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
// import * as fromRoot from 'app.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('alertState', [
      state('noError', style({opacity: 0, transform: 'translateY(-100px)'})),
      state('error', style({opacity: 1, transform: 'translateY(1em)'})),
      transition('noError => error', animate(750)),
      transition('error => noError', animate(750))
    ])
  ]
})

export class AppComponent implements OnInit {
  state = 'noError';
  title = 'app';
  showMessageTime = 4500; // Duration in ms
  authState$: Observable<firebase.User>;

  constructor(
    public _authService: AuthService,
    // private _store: Store<fromRoot.State>
    ) { }

  ngOnInit() {
    this.authState$ = this._authService.getAuthState();
  }
  handleDone() {
    // tslint:disable-next-line:curly
    if (this.state === 'noError') return;
    setTimeout(() => {
      this.state = 'noError';
    }, this.showMessageTime);
  }
}
