import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JaneinPipe } from './janein.pipe';
import { AlertTopComponent } from './components/alert-top/alert-top.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    JaneinPipe,
    AlertTopComponent,
    LoginComponent
  ],
  exports: [
    JaneinPipe,
    AlertTopComponent,
    LoginComponent,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [UserService]
})
export class SharedModule { }
