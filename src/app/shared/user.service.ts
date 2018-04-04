import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  // uid = firebase.auth().currentUser.uid;
  uid: string;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => user ? this.uid = user.uid : this.uid = null );
  }


  getCurrentFF(): Observable<string> {
    this.usersCollection = this.afs.collection<User>('Users', (ref) => {
      return ref.where('uid', '==', this.uid );
    });
    return this.usersCollection.valueChanges().map(data => {
      return data[0].feuerwehr;
    });
  }
}
