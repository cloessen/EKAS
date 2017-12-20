import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Kamerad } from './interfaces';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class FirestoreService {

  private kameradenCollection: AngularFirestoreCollection<Kamerad>;
  kameraden: Observable<Kamerad[]>;
  private personalCollection: AngularFirestoreCollection<Kamerad>;
  personal: Observable<Kamerad[]>;

  constructor(private afs: AngularFirestore) {
    this.kameradenCollection = afs.collection<Kamerad>('Kameraden',(ref) => {
      return ref.orderBy('lastName', 'asc')
        .where('anwesend','==', true)
    });
    this.kameraden = this.kameradenCollection.valueChanges();

    this.personalCollection = afs.collection<Kamerad>('Kameraden',(ref) => {
      return ref.orderBy('lastName', 'asc')
    });
    this.personal = this.personalCollection.valueChanges();
    // this.kameraden = this.kameradenCollection.snapshotChanges().map(action => {
    //   return action.map(a => {
    //     const data = a.payload.doc.data() as Kamerad;
    //     const id = a.payload.doc.id;
    //     return { id, ...data}
    //   })
    // });
  }

  deleteKamerad(kamerad:Kamerad){
    return this.kameradenCollection.doc(kamerad.rfid).delete();
  }


  getKameraden(){
    return this.kameraden;
  }
  getPersonal(){
    return this.personal;
  }

  saveNewKamerad(kamerad: Kamerad){
    // this.kameradenCollection.doc(kamerad.rfid).set(kamerad).then(()=> console.log('safed???'));
    this.kameradenCollection.doc(kamerad.rfid).set(kamerad).catch((err) => console.log(err));

  }
  updateKamerad(kamerad:Kamerad){
    console.log('[FBS]: updateKamerad(): ',kamerad);
    return this.kameradenCollection.doc(kamerad.rfid).update(kamerad);

  }

}
