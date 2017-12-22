import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './shared/auth.service';
import { FirestoreService } from './shared/firestore.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NewKameradFormComponent } from './new-kamerad-form/new-kamerad-form.component';
import { KameradFormComponent } from './kamerad-form/kamerad-form.component';
import { PersonalComponent } from './personal/personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    PersonalComponent,
    KameradFormComponent,
    NewKameradFormComponent,
    HeaderComponent,
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [FirestoreService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
