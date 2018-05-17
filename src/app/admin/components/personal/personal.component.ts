import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DatatableComponent } from '@swimlane/ngx-datatable/release';
import { Kamerad } from '../../../shared/interfaces';
import { FirestoreService } from '../../../shared/firestore.service';
import { MatDialog } from '@angular/material';
import { KameradFormComponent } from '../kamerad-form/kamerad-form.component';
import { NewKameradFormComponent } from '../new-kamerad-form/new-kamerad-form.component';
import { UIService } from '../../../shared/ui.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../Store/UI/ui.actions';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {

  public personalSubscription: Subscription;
  isLoading$: Observable<boolean>;
  rows: Kamerad[] = [];
  temp: Kamerad[] = [];
  selected = [];
  columns = [
    { prop: 'lastName', name: 'Nachname' },
    { prop: 'firstName', name: 'Vorname' },
    { prop: 'rfid', name: 'RFID' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private afs: FirestoreService,
    private matDialog: MatDialog,
    // private UI: UIService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.UI.isLoading$.next(true);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.dispatch(new UI.StartLoading);
    console.log('start loading...');
    this.personalSubscription = this.afs.getPersonal().subscribe((data) => {
      console.log('finished loading...');
      this.store.dispatch(new UI.StopLoading);
      // this.UI.isLoading$.next(false);
      this.rows = data;
      this.temp = [...data];
      this.selected[0] = this.temp[0];
    });
  }
  ngOnDestroy() {
    this.personalSubscription.unsubscribe();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d: Kamerad) {
      return d.lastName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // this.testrows = this.temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect() {
    this.matDialog.open(KameradFormComponent, {
      data: this.selected[0],
      disableClose: true,
      backdropClass: 'darker-backdrop'
    });
  }
  onOpenAddDialog() {
    this.matDialog.open(NewKameradFormComponent, {
      disableClose: true,
      backdropClass: 'darker-backdrop'
    });
  }

}
