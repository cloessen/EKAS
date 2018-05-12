import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

import { LoginComponent } from './shared/components/login/login.component';
import { AdminGuard } from './shared/admin-guard.service';



const routes: Routes = [
  {
    path: '', component: OverviewComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    // TODO: rewrite for production!!!!!!!!!!
    // canLoad: [AdminGuard],
  },
  {
    path: ':ff', component: OverviewComponent
  },
  {
    path: '**', redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
