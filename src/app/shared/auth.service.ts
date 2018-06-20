import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../Store/app.reducer';

@Injectable()
export class AuthService {

  private usersCollection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;


  constructor(public _afAuth: AngularFireAuth,
              public _afs: AngularFirestore,
              private _userService: UserService,
              private _store: Store<fromRoot.State>) {}

  public getAuthState() {
    return this._afAuth.authState;
  }
  private getUserUid() {
    return this._afAuth.auth.currentUser.uid;
  }
  private getAdminStatus(uid): Observable<boolean> {
    this.usersCollection = this._afs.collection<User>('Users', (ref) => {
      return ref.where('uid', '==', uid );
    });
    return this.usersCollection.valueChanges().pipe(map(data => {
      return data[0].isAdmin;
    }));
  }
  public isAdmin(): Observable<boolean> {
    return this.getAdminStatus(this.getUserUid());
  }

  public login(email, password) {
    this._store.dispatch({type: 'START_LOADING'});
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userObj) => {
        // check for right FF
        // QUERRY THE USER SERVICE!
        this._userService.checkFF();
        this._store.dispatch({type: 'STOP_LOADING'});
      })
      .catch((err) =>  {
        this._store.dispatch({type: 'STOP_LOADING'});
        return err;
      });
  }

  public logout() {
    this._afAuth.auth.signOut();
  }
}
