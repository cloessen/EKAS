import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JaneinPipe } from './janein.pipe';
import { AlertTopComponent } from './components/alert-top/alert-top.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    JaneinPipe,
    AlertTopComponent,
    LoginComponent
  ],
  exports: [
    JaneinPipe,
    AlertTopComponent,
    LoginComponent
  ],
  providers: []
})
export class SharedModule { }
