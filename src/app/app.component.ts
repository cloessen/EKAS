import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


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

  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }
  handleDone() {
    // tslint:disable-next-line:curly
    if (this.state === 'noError') return;
    setTimeout(() => {
      this.state = 'noError';
    }, this.showMessageTime);
  }
}
