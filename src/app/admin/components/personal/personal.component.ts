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

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {

  public personalSubscription: Subscription;
  public isLoading$: Observable<boolean> = this.UI.isLoading$;
  rows: Kamerad[] = [];
  temp: Kamerad[] = [];
  selected = [];
  columns = [
    { prop: 'lastName', name: 'Nachname' },
    { prop: 'firstName', name: 'Vorname' },
    { prop: 'rfid', name: 'RFID' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private firebase: FirestoreService, private matDialog: MatDialog, private UI: UIService) { }

  ngOnInit() {
    this.UI.isLoading$.next(true);
    this.personalSubscription = this.firebase.getPersonal().subscribe((data) => {
      this.UI.isLoading$.next(false);
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
