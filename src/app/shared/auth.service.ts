import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import { State } from '../app.reducer';

@Injectable()
export class AuthService {

  private usersCollection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;


  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              private userService: UserService,
              private store: Store<{ui: State}>) {}

  public getAuthState() {
    return this.afAuth.authState;
  }
  private getUserUid() {
    return this.afAuth.auth.currentUser.uid;
  }
  private getAdminStatus(uid): Observable<boolean> {
    this.usersCollection = this.afs.collection<User>('Users', (ref) => {
      return ref.where('uid', '==', uid );
    });
    return this.usersCollection.valueChanges().map(data => {
      return data[0].isAdmin;
    });
  }
  public isAdmin(): Observable<boolean> {
    return this.getAdminStatus(this.getUserUid());
  }

  public login(email, password) {
    this.store.dispatch({type: 'START_LOADING'});
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch({type: 'STOP_LOADING'});
      })
      .catch((err) =>  {
        this.store.dispatch({type: 'STOP_LOADING'});
        return err;
      });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
