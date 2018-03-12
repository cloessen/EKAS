import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { PersonalComponent } from './components/personal/personal.component';
import { NewKameradFormComponent } from './components/new-kamerad-form/new-kamerad-form.component';
import { KameradFormComponent } from './components/kamerad-form/kamerad-form.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminGuard } from '../shared/admin-guard.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    PersonalComponent,
    KameradFormComponent,
    NewKameradFormComponent,
    UsersComponent
  ],
  providers: [
  ],
  entryComponents: [
    KameradFormComponent,
    NewKameradFormComponent
  ]
})
export class AdminModule { }