import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JaneinPipe } from './janein.pipe';
import { FirestoreService } from './firestore.service';
import { AlertTopComponent } from './components/alert-top/alert-top.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
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
