import { Component, OnDestroy, OnInit } from '@angular/core';
import { Kamerad, Overview } from '../shared/interfaces';
import { FirestoreService } from '../shared/firestore.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  public kameradenSubscription: Subscription;
  public finishedLoading = false;
  public overview: Overview;
  public kameraden : Kamerad[];
  public zf:Kamerad[];
  public owf:Kamerad[];
  public gwf:Kamerad[];

  constructor(private afs: FirestoreService) { }

  calculateFunktionen(data: Kamerad[]) {
    this.gwf = [];
    this.owf = [];
    this.zf = [];
    this.overview = new Overview();
    this.overview.sum = data.length;
    data.forEach((kamerad: Kamerad) => {
      const obj = kamerad.funktionen;
      for (let funktion in obj) {
        if (obj[funktion]) {
          this.overview[funktion]++;
        }
      }
      if(kamerad.funktionen.owf) {
        // let index = data.indexOf(kamerad);
        this.owf.push(kamerad);
      }
      if(kamerad.funktionen.gwf) {
        // let index = data.indexOf(kamerad);
        this.gwf.push(kamerad);
      }
      if(kamerad.funktionen.ZF) {
        // let index = data.indexOf(kamerad);
        this.zf.push(kamerad);
      }
    });
    //remove ZF & OWF & GWF from kameraden[]
    this.zf.forEach((kamerad) => this.kameraden.splice(this.kameraden.indexOf(kamerad),1));
    this.owf.forEach((kamerad) => this.kameraden.splice(this.kameraden.indexOf(kamerad),1));
    this.gwf.forEach((kamerad) => this.kameraden.splice(this.kameraden.indexOf(kamerad),1));
  }
  ngOnInit(){
    this.kameradenSubscription = this.afs.getKameraden().subscribe((data) => {
        this.kameraden = data;
        this.calculateFunktionen(data);
        this.finishedLoading = true;
    });
  }
  ngOnDestroy(){
    this.kameradenSubscription.unsubscribe();
  }
}
