import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Kamerad } from './interfaces';
import { Store } from '@ngrx/store';
import * as fromRoot from '../Store/app.reducer';


@Injectable()
export class KameradenService {
  private alleKameradenCollection: AngularFirestoreCollection<Kamerad>;
  constructor(
    private _afs: AngularFirestore,
    private _store: Store<fromRoot.State>
  ) {
    console.log('KameradenService, constructor');
    this._store.select(fromRoot.getCurrentFF).subscribe(currentFF => {
      this.alleKameradenCollection = _afs.collection<Kamerad>('Feuerwehr/' + currentFF + '/Kameraden', (ref) => {
        return ref.orderBy('lastName', 'asc');
      });
    });
  }

  deleteKamerad(id: string) {
    return this.alleKameradenCollection.doc(id).delete();
  }

  saveNewKamerad(kamerad: Kamerad) {
    return this.alleKameradenCollection.doc(kamerad.rfid).set(kamerad);

  }
  updateKamerad(kamerad: Kamerad) {
    return this.alleKameradenCollection.doc(kamerad.rfid).update(kamerad);

  }

}
