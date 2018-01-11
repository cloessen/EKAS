import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PersonalComponent } from './admin/components/personal/personal.component';
import { NewKameradFormComponent } from './admin/components/new-kamerad-form/new-kamerad-form.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/admin-guard.service';


const routes: Routes = [
  {
    path: '', component: OverviewComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
