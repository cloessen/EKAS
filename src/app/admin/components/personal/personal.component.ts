import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DatatableComponent } from '@swimlane/ngx-datatable/release';
import { Kamerad } from '../../../shared/interfaces';
import { FirestoreService } from '../../../shared/firestore.service';
import { MatDialog } from '@angular/material';
import { KameradFormComponent } from '../kamerad-form/kamerad-form.component';
import { NewKameradFormComponent } from '../new-kamerad-form/new-kamerad-form.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {

  public personalSubscription: Subscription;
  // public personal : Kamerad[];
  rows: Kamerad[] = [];
  testrows: Kamerad[] = [];
  temp: Kamerad[] = [];
  selected = [];
  columns = [
    { prop: 'lastName', name: 'Nachname' },
    { prop: 'firstName', name: 'Vorname' },
    // { prop: 'funktionen.PA', name: 'Atemschutz' },
    // { prop: 'funktionen.CE', name: 'Maschinist' },
    // { prop: 'funktionen.gsg', name: 'Gefahrgut' },
    // { prop: 'funktionen.saw', name: 'Sägenführer' },
    // { prop: 'funktionen.eva', name: 'EVA-Gruppe' },
    // { prop: 'funktionen.log', name: 'Logistik-Gruppe' },
    // { prop: 'funktionen.NS', name: 'Notstrom-Gruppe' },
    // { prop: 'funktionen.RS', name: 'RettSan' },
    // { prop: 'funktionen.GF', name: 'Gruppenführer' },
    // { prop: 'funktionen.ZF', name: 'Zugführer' },
    // { prop: 'funktionen.owf', name: 'OWF' },
    // { prop: 'funktionen.gwf', name: 'GWF' },
    { prop: 'rfid', name: 'RFID' }
  ];
  // loadingIndicator: boolean = true;
  // reorderable: boolean = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;




  constructor(private firebase: FirestoreService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.personalSubscription = this.firebase.getPersonal().subscribe((data) => {
      // this.personal = data;
      this.rows = data;
      // this.testrows = data;
      this.temp = [...data];
      this.selected[0] = this.temp[0];
      // console.log('[TABLE] onInit() this.selected: ', this.selected);
      // console.log('[TABLE] onInit() data[0]: ', data[0]);
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
