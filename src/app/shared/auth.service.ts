import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService {

  private usersCollection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;


  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {}

  public getAuthState() {
    return this.afAuth.authState;
  }
  private getUserUid() {
    return this.afAuth.auth.currentUser.uid;
  }
  private getAdminStatus(uid) {
    this.usersCollection = this.afs.collection<User>('Users', (ref) => {
      return ref.where('uid', '==', uid );
    });
    this.users = this.usersCollection.valueChanges();
    return this.users;
  }
  public isAdmin() {
    return this.getAdminStatus(this.getUserUid());
  }

  public login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((err) =>  err);
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
