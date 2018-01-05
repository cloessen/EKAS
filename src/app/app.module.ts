import { NgModule } from '@angular/core';
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
import { MaterialModule } from './shared/material/material.module';
import {AdminModule} from './admin/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    PersonalComponent,
    KameradFormComponent,
    NewKameradFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule
  ],
  providers: [FirestoreService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
