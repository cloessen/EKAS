// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator, MatSort } from '@angular/material';
// import { map } from 'rxjs/operators';
// import { Observable, of as observableOf, merge } from 'rxjs';
// import { Kamerad } from '../../../shared/interfaces';
// import * as fromRoot from '../../../Store/app.reducer';
// import { Store } from '@ngrx/store';
//
// /**
//  * Data source for the Kameraden view. This class should
//  * encapsulate all logic for fetching and manipulating the displayed data
//  * (including sorting, pagination, and filtering).
//  */
//
// export class KameradenDataSourceComponent extends DataSource<Kamerad> {
//   data: Kamerad[];
//   _store: Store<fromRoot.State>;
//   constructor(
//     private paginator: MatPaginator,
//     private sort: MatSort,
//     private filter: string,
//     ) {
//     super();
//
//     // this._store.select(fromRoot.getAlleKameraden)
//     //   .subscribe((kameraden: Kamerad[]) => this.data = kameraden.filter(
//     //     (d: Kamerad) => d.lastName.toLowerCase().indexOf(this.filter) !== -1 || !this.filter));
//   }
//
//
//   /**
//    * Connect this data source to the table. The table will only update when
//    * the returned stream emits new items.
//    * @returns A stream of the items to be rendered.
//    */
//   connect(): Observable<Kamerad[]> {
//     // Combine everything that affects the rendered data into one update
//     // stream for the data-table to consume.
//     const dataMutations = [
//       observableOf(this.data),
//       this.paginator.page,
//       this.sort.sortChange
//     ];
//
//     // Set the paginators length
//     this.paginator.length = this.data.length;
//
//     return merge(...dataMutations).pipe(map(() => {
//       return this.getPagedData(this.getSortedData([...this.data]));
//     }));
//   }
//
//   /**
//    *  Called when the table is being destroyed. Use this function, to clean up
//    * any open connections or free any held resources that were set up during connect.
//    */
//   disconnect() {}
//
//   /**
//    * Paginate the data (client-side). If you're using server-side pagination,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getPagedData(data: Kamerad[]) {
//     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//     return data.splice(startIndex, this.paginator.pageSize);
//   }
//
//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getSortedData(data: Kamerad[]) {
//     if (!this.sort.active || this.sort.direction === '') {
//       return data;
//     }
//
//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === 'asc';
//       switch (this.sort.active) {
//         case 'lastName': return compare(a.lastName, b.lastName, isAsc);
//         // case 'firstName': return compare(+a.firstName, +b.firstName, isAsc);
//         // case 'rfid': return compare(+a.rfid, +b.rfid, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }
//
// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a, b, isAsc) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
