import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Kamerad, Overview} from './interfaces';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../Store/app.reducer';
import {
  SetAlleKameraden,
  SetAnwesendeGWF,
  SetAnwesendeKameraden,
  SetAnwesendeOWF,
  SetAnwesendeZF,
  SetOverview
} from '../Store/Kameraden/kameraden.actions';

@Injectable()
export class FirestoreService {

  private anwesendeKameradenCollection: AngularFirestoreCollection<Kamerad>;
  private alleKameradenCollection: AngularFirestoreCollection<Kamerad>;
  kameraden: Observable<Kamerad[]>;


  constructor(private _afs: AngularFirestore,
              private userService: UserService,
              private _store: Store<fromRoot.State>) {
    this._store.select(fromRoot.getCurrentFF).subscribe(currentFF => {
      // fetch all Kameraden and dispatch to the Store
      this.alleKameradenCollection = _afs.collection<Kamerad>(`Feuerwehr/${currentFF}/Kameraden`, (ref) => {
        return ref.orderBy('lastName', 'asc');
      });
      this.alleKameradenCollection.valueChanges()
        .subscribe(kameraden => this._store.dispatch(new SetAlleKameraden(kameraden)));
      // fetch anwesende Kameraden and dispatch to the Store
      this.anwesendeKameradenCollection = _afs.collection<Kamerad>(`Feuerwehr/${currentFF}/Kameraden`, (ref) => {
        return ref.orderBy('lastName', 'asc')
          .where('anwesend', '==', true);
      });
      // this.kameraden = this.kameradenCollection.valueChanges();
      this.anwesendeKameradenCollection.valueChanges()
        .subscribe((kameraden: Kamerad[]) => {
          // ANWESENDE FUNKTIONEN ERRECHNEN UND OVERVIEW UND VERSCHIEDENE PERSONAL ARRAYS SETZEN
          const gwf = [];
          const owf = [];
          const zf = [];
          let overview = null;
          overview = new Overview();
          overview.sum = kameraden.length;
          kameraden.forEach((kamerad: Kamerad) => {
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
          zf.forEach((kamerad) => kameraden.splice(kameraden.indexOf(kamerad), 1));
          owf.forEach((kamerad) => kameraden.splice(kameraden.indexOf(kamerad), 1));
          gwf.forEach((kamerad) => kameraden.splice(kameraden.indexOf(kamerad), 1));
          this._store.dispatch(new SetAnwesendeKameraden(kameraden));
          this._store.dispatch(new SetAnwesendeGWF(gwf));
          this._store.dispatch(new SetAnwesendeOWF(owf));
          this._store.dispatch(new SetAnwesendeZF(zf));
          if (overview.sum < 1) {
            overview = null;
          }
          this._store.dispatch(new SetOverview(overview));
        }, (error: Error) => console.log(error));
    });
  }
}
