import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../Store/app.reducer';
import { Observable } from 'rxjs';
import { UIError } from '../../interfaces';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasError: Observable<UIError>;

  constructor(
    public _authService: AuthService,
    public _store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.hasError = this._store.select(fromRoot.getHasError);
  }

  async onSubmitLogin(data) {
    // this.hasError = await this._authService.login(data.email, data.password, data.currentFF);
    this._authService.login(data.email, data.password, data.currentFF);
  }
  onSubmitLogout() {
    this._authService.logout();
  }

}
