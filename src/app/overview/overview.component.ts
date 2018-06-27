import { Component, OnDestroy, OnInit } from '@angular/core';
import { Kamerad, Overview } from '../shared/interfaces';
import { FirestoreService } from '../shared/firestore.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import * as fromRoot from '../Store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  public kameradenSubscription: Subscription;
  public finishedLoading = false;
  public overview: Overview;
  public overviewSubscription: Subscription;
  // public kameraden: Kamerad[];
  public kameraden: Observable<Kamerad[]>;
  // public kameraden: Observable<Kamerad[]>;
  public zf: Observable<Kamerad[]>;
  public owf: Observable<Kamerad[]>;
  public gwf: Observable<Kamerad[]>;
  public personalSubscription: Subscription;
  public komplettesPersonal: Observable<Kamerad[]>;


  constructor(
    private afs: FirestoreService,
    private http: HttpClient,
    private _store: Store<fromRoot.State> ) {

  }
  ngOnInit() {
    this.komplettesPersonal = this._store.select(fromRoot.getAlleKameraden);
    this.kameraden = this._store.select(fromRoot.getAnwesendeKameraden);
    this.gwf = this._store.select(fromRoot.getAnwesendeGWF);
    this.owf = this._store.select(fromRoot.getAnwesendeOWF);
    this.zf = this._store.select(fromRoot.getAnwesendeZF);
    this.overviewSubscription = this._store.select(fromRoot.getOverview)
      .subscribe((overview: Overview) => {
        this.overview = overview;
        this.finishedLoading = true;
      });

  }
  ngOnDestroy() {
    // this.kameradenSubscription.unsubscribe();
    // this.personalSubscription.unsubscribe();
    this.overviewSubscription.unsubscribe();

  }


  toggleAnwesenheit(rfid) {
    const response = this.http.get(`https://us-central1-anwesenheit-ff.cloudfunctions.net/toggle?rfid=${rfid}`).toPromise();
    response
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
