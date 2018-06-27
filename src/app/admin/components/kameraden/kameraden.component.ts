import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Kamerad } from '../../../shared/interfaces';
import * as fromRoot from '../../../Store/app.reducer';
import { Store } from '@ngrx/store';
import { KameradFormComponent } from '../kamerad-form/kamerad-form.component';
import { NewKameradFormComponent } from '../new-kamerad-form/new-kamerad-form.component';

@Component({
  selector: 'app-kameraden',
  templateUrl: './kameraden.component.html',
  styleUrls: ['./kameraden.component.scss']
})
export class KameradenComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Kamerad>;
  // dataSource: any;
  fullData: Kamerad[];

  constructor(
    private matDialog: MatDialog,
    private _store: Store<fromRoot.State>) {

    this._store.select(fromRoot.getAlleKameraden).subscribe((kameraden: Kamerad[]) => {
      // this.fullData = kameraden;
      this.dataSource = new MatTableDataSource(kameraden);
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['lastName', 'firstName', 'rfid'];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateFilter(event) {
    const filter = event.target.value ? event.target.value.toLowerCase() : null;
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelect(kamerad) {
    this.matDialog.open(KameradFormComponent, {
      data: kamerad,
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
