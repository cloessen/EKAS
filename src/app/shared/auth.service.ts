import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './interfaces';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../Store/app.reducer';
import { Router } from '@angular/router';
import { UIService } from './ui.service';
import { SetCurrentFF } from '../Store/Basic/basic.actions';
import { ResetError, SetError, StartLoading, StopLoading } from '../Store/UI/ui.actions';

@Injectable()
export class AuthService {

  private usersCollection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;
  currentFF: string;

  constructor(public _afAuth: AngularFireAuth,
              public _afs: AngularFirestore,
              private _userService: UserService,
              private _store: Store<fromRoot.State>,
              private _UI: UIService,
              private _router: Router) {
    this._store.select(fromRoot.getCurrentFF).subscribe(ff => this.currentFF = ff);
  }

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


  public login(email: string, password: string, currentFF: string) {
    this._store.dispatch(new StartLoading());
    this._afs.collection<User>(`Feuerwehr/${currentFF}/Users`, ref => ref.where('email', '==', email))
      .valueChanges()
      .take(1)
      .subscribe(data => {
        console.log(data);
        if (!data.length) {
          // USER AND FF do not fit! User is not part of entered FF
          // const myError = new Error('User or FF does not exist...');
          const myError = {
            code: 'User or FF does not exist',
            message: 'Auf Groß- und Kleinschreibung bei der Feuerwehr achten'
          };
          // console.error(myError);
          // console.log(typeof myError);
          this._store.dispatch(new SetError(myError));
        } else {
          this._afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
              this._store.dispatch(new SetCurrentFF(currentFF));
              this._store.dispatch(new StopLoading());
              this._store.dispatch(new ResetError());
            })
            .catch((err: Error) => {
              this._store.dispatch(new StopLoading());
              this._store.dispatch(new SetError(err));
            });
        }
      });
    }


  // public login(email, password, currentFF) {
  //   this._store.dispatch(new StartLoading());
  //   this._afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((userObj) => {
  //       return this._afs.collection<User>(`Feuerwehr/${currentFF}/Users`, (ref) => {
  //         return ref.where('uid', '==', userObj.user.uid );
  //       }).valueChanges().take(1).subscribe(data => {
  //         if (!data.length) {
  //           this.logout();
  //           return new Error('falsche FF');
  //         }
  //         this._store.dispatch(new SetCurrentFF(currentFF));
  //         this._store.dispatch(new StopLoading());
  //       });
  //     })
  //     .catch((err: Error) =>  {
  //       this._store.dispatch(new StopLoading());
  //       return err;
  //     });
  // }

  public logout() {
    this._afAuth.auth.signOut()
      .catch(() => this._UI.showSnackBar('Fehler beim Ausloggen, bitte den Support kontaktiern.... FEHLERCODE: 1122', 2500));
    this._router.navigate(['/'])
      .catch(() => this._UI.showSnackBar('Fehler beim navigieren zur Startseite, bitte den Support kontaktiern....FEHLERCODE:1133', 2500));
  }
}
