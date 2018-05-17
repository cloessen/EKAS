import { Component, OnDestroy, OnInit } from '@angular/core';
import { Kamerad, Overview } from '../shared/interfaces';
import { FirestoreService } from '../shared/firestore.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  public kameradenSubscription: Subscription;
  public finishedLoading = false;
  public overview: Overview;
  public kameraden: Kamerad[];
  // public kameraden: Observable<Kamerad[]>;
  public zf: Kamerad[];
  public owf: Kamerad[];
  public gwf: Kamerad[];
  public personalSubscription: Subscription;
  public komplettesPersonal: Kamerad[];


  constructor(
    private afs: FirestoreService,
    private http: HttpClient,
    private _store: Store<fromRoot.State> ) { }



  calculateFunktionen(data: Kamerad[]) {
    this.gwf = [];
    this.owf = [];
    this.zf = [];
    this.overview = new Overview();
    this.overview.sum = data.length;
    data.forEach((kamerad: Kamerad) => {
      const obj = kamerad.funktionen;
      for (const funktion in obj) {
        if (obj[funktion]) {
          this.overview[funktion]++;
        }
      }
      if (kamerad.funktionen.owf) {
        this.owf.push(kamerad);
      }
      if (kamerad.funktionen.gwf) {
        this.gwf.push(kamerad);
      }
      if (kamerad.funktionen.ZF) {
        this.zf.push(kamerad);
      }
    });
    // remove ZF & OWF & GWF from kameraden[]
    this.zf.forEach((kamerad) => data.splice(this.kameraden.indexOf(kamerad), 1));
    this.owf.forEach((kamerad) => data.splice(this.kameraden.indexOf(kamerad), 1));
    this.gwf.forEach((kamerad) => data.splice(this.kameraden.indexOf(kamerad), 1));
    return data;
  }
  ngOnInit() {
    this.kameradenSubscription = this._store.select(fromRoot.getAnwesendeKameraden).subscribe((kameraden: Kamerad[]) => {
        // this.kameraden = kameraden;
        // this.calculateFunktionen(kameraden);
      this.kameraden = this.calculateFunktionen(kameraden);
      console.log('kameraden ... ', this.kameraden);
        this.finishedLoading = true;
    });
    // this.kameraden = this._store.select(fromRoot.getAnwesendeKameraden);
    this.personalSubscription = this._store.select(fromRoot.getAlleKameraden).subscribe((kameraden: Kamerad[]) => {
      this.komplettesPersonal = kameraden;
    });

  }
  ngOnDestroy() {
    this.kameradenSubscription.unsubscribe();
    this.personalSubscription.unsubscribe();

  }


  toggleAnwesenheit(rfid) {
    const response = this.http.get(`https://us-central1-anwesenheit-ff.cloudfunctions.net/toggle?rfid=${rfid}`).toPromise();
    response
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
