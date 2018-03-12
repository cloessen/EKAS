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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminGuard } from './shared/admin-guard.service';
import { UIService } from './shared/ui.service';
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxDatatableModule
  ],
  providers: [FirestoreService, AuthService, AdminGuard, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
