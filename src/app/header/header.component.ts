import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }
  onSubmitLogout() {
    this._authService.logout();
  }

}
