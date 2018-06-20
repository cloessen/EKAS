import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { NewKameradFormComponent } from './components/new-kamerad-form/new-kamerad-form.component';
import { KameradFormComponent } from './components/kamerad-form/kamerad-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { KameradenComponent } from './components/kameraden/kameraden.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { Store } from '@ngrx/store';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    AdminComponent,
    KameradFormComponent,
    NewKameradFormComponent,
    UsersComponent,
    UserFormComponent,
    NewUserFormComponent,
    KameradenComponent
  ],
  providers: [],
  entryComponents: [
    KameradFormComponent,
    NewKameradFormComponent
  ]
})
export class AdminModule { }
