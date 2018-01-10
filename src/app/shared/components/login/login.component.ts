import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasError = null;

  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }

  async onSubmitLogin(data) {
    this.hasError = await this._authService.login(data.email, data.password);
  }
  onSubmitLogout() {
    this._authService.logout();
  }

}
