import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Kamerad } from './interfaces';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { SetAlleKameraden, SetAnwesendeKameraden } from '../Store/Kameraden/kameraden.actions';

@Injectable()
export class FirestoreService {

  private anwesendeKameradenCollection: AngularFirestoreCollection<Kamerad>;
  private alleKameradenCollection: AngularFirestoreCollection<Kamerad>;
  kameraden: Observable<Kamerad[]>;
  private personalCollection: AngularFirestoreCollection<Kamerad>;
  personal: Observable<Kamerad[]>;


  constructor(private _afs: AngularFirestore,
              private userService: UserService,
              private _store: Store<fromRoot.State>) {
    this.anwesendeKameradenCollection = _afs.collection<Kamerad>('Kameraden', (ref) => {
      return ref.orderBy('lastName', 'asc')
        .where('anwesend', '==', true);
    });
    // this.kameraden = this.kameradenCollection.valueChanges();
    this.anwesendeKameradenCollection.valueChanges().subscribe((kameraden: Kamerad[]) => this._store.dispatch(new SetAnwesendeKameraden(kameraden)));


    this.alleKameradenCollection = _afs.collection<Kamerad>('Kameraden', (ref) => {
      return ref.orderBy('lastName', 'asc')
    });
    // this.kameraden = this.kameradenCollection.valueChanges();
    this.alleKameradenCollection.valueChanges().subscribe(kameraden => this._store.dispatch(new SetAlleKameraden(kameraden)));

    // this.personalCollection = _afs.collection<Kamerad>('Kameraden', (ref) => {
    //   return ref.orderBy('lastName', 'asc');
    // });
    // this.personal = this.personalCollection.valueChanges();
  }

  deleteKamerad(kamerad: Kamerad) {
    return this.anwesendeKameradenCollection.doc(kamerad.rfid).delete();
  }


  getKameraden() {
    return this.kameraden;
  }
  getPersonal() {
    return this.personal;
  }

  saveNewKamerad(kamerad: Kamerad) {
    return this.anwesendeKameradenCollection.doc(kamerad.rfid).set(kamerad);

  }
  updateKamerad(kamerad: Kamerad) {
    return this.anwesendeKameradenCollection.doc(kamerad.rfid).update(kamerad);

  }

}
