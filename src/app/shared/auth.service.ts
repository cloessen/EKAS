import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  getAuthState() {
    return this.afAuth.authState;
  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(err => console.log(err));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
