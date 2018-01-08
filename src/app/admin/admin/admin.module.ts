import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from '../components/users/users.component';
import { PersonalComponent } from '../components/personal/personal.component';
import { NewKameradFormComponent } from '../../new-kamerad-form/new-kamerad-form.component';
import { KameradFormComponent } from '../../kamerad-form/kamerad-form.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    PersonalComponent,
    KameradFormComponent,
    NewKameradFormComponent,
    UsersComponent]
})
export class AdminModule { }
