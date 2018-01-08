import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  getAuthState() {
    return this.afAuth.authState;
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.code);
        return err.code;
        });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
