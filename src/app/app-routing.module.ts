import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PersonalComponent } from './admin/components/personal/personal.component';
import { NewKameradFormComponent } from './new-kamerad-form/new-kamerad-form.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';


const routes: Routes = [
  {
    path: '', component: OverviewComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'editPersonal', component: PersonalComponent
  },
  {
    path: 'newPersonal', component: NewKameradFormComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
