import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Kamerad, Overview } from './interfaces';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../Store/app.reducer';
import {
  SetAlleKameraden,
  SetAnwesendeGWF,
  SetAnwesendeKameraden,
  SetAnwesendeOWF,
  SetAnwesendeZF, SetOverview
} from '../Store/Kameraden/kameraden.actions';

@Injectable()
export class KameradenService {

  private anwesendeKameradenCollection: AngularFirestoreCollection<Kamerad>;
  private alleKameradenCollection: AngularFirestoreCollection<Kamerad>;
  kameraden: Observable<Kamerad[]>;
  private personalCollection: AngularFirestoreCollection<Kamerad>;
  personal: Observable<Kamerad[]>;


  constructor(private _afs: AngularFirestore,
              private _userService: UserService,
              private _store: Store<fromRoot.State>) {
    this.anwesendeKameradenCollection = _afs.collection<Kamerad>('Kameraden', (ref) => {
      return ref.orderBy('lastName', 'asc')
        .where('anwesend', '==', true);
    });
    this.anwesendeKameradenCollection.valueChanges()
      .subscribe((AlleAnwesendenKameraden: Kamerad[]) => {
        // ANWESENDE FUNKTIONEN ERRECHNEN UND OVERVIEW UND VERSCHIEDE PERSONAL ARRAYS SETZEN
          const gwf = [];
          const owf = [];
          const zf = [];
          let overview = null;
            overview = new Overview();
            overview.sum = AlleAnwesendenKameraden.length;
            AlleAnwesendenKameraden.forEach((kamerad: Kamerad) => {
              const obj = kamerad.funktionen;
              for (const funktion in obj) {
                if (obj[funktion]) {
                  overview[funktion]++;
                }
              }
              if (kamerad.funktionen.owf) {
                owf.push(kamerad);
              }
              if (kamerad.funktionen.gwf) {
                gwf.push(kamerad);
              }
              if (kamerad.funktionen.ZF) {
                zf.push(kamerad);
              }
            });
            // remove ZF & OWF & GWF from kameraden[]
            zf.forEach((kamerad) => AlleAnwesendenKameraden.splice(AlleAnwesendenKameraden.indexOf(kamerad), 1));
            owf.forEach((kamerad) => AlleAnwesendenKameraden.splice(AlleAnwesendenKameraden.indexOf(kamerad), 1));
            gwf.forEach((kamerad) => AlleAnwesendenKameraden.splice(AlleAnwesendenKameraden.indexOf(kamerad), 1));
            this._store.dispatch(new SetAnwesendeKameraden(AlleAnwesendenKameraden));
            this._store.dispatch(new SetAnwesendeGWF(gwf));
            this._store.dispatch(new SetAnwesendeOWF(owf));
            this._store.dispatch(new SetAnwesendeZF(zf));
            if ( overview.sum < 1 ) {
              overview = null;
            }
            this._store.dispatch(new SetOverview(overview));
      });


    this.alleKameradenCollection = _afs.collection<Kamerad>('Kameraden', (ref) => {
      return ref.orderBy('lastName', 'asc');
    });
    this.alleKameradenCollection.valueChanges().subscribe(kameraden => this._store.dispatch(new SetAlleKameraden(kameraden)));

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
