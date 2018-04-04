import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Kamerad } from './interfaces';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class FirestoreService {

  private kameradenCollection: AngularFirestoreCollection<Kamerad>;
  kameraden: Observable<Kamerad[]>;
  private personalCollection: AngularFirestoreCollection<Kamerad>;
  personal: Observable<Kamerad[]>;
  currentFF: string;

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.userService.getCurrentFF().subscribe(feuerwehr => this.currentFF = feuerwehr);
    console.log(this.currentFF);
    this.kameradenCollection = afs.collection<Kamerad>(`Feuerwehr/${this.currentFF}/Kameraden`, (ref) => {
      return ref.orderBy('lastName', 'asc')
        .where('anwesend', '==', true);
    });
    this.kameraden = this.kameradenCollection.valueChanges();

    this.personalCollection = afs.collection<Kamerad>(`Feuerwehr/${this.currentFF}/Kameraden`, (ref) => {
      return ref.orderBy('lastName', 'asc');
    });
    this.personal = this.personalCollection.valueChanges();
  }

  deleteKamerad(kamerad: Kamerad) {
    return this.kameradenCollection.doc(kamerad.rfid).delete();
  }


  getKameraden() {
    return this.kameraden;
  }
  getPersonal() {
    return this.personal;
  }

  saveNewKamerad(kamerad: Kamerad) {
    return this.kameradenCollection.doc(kamerad.rfid).set(kamerad);

  }
  updateKamerad(kamerad: Kamerad) {
    return this.kameradenCollection.doc(kamerad.rfid).update(kamerad);

  }

}
