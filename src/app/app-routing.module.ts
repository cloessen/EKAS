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
    canActivate: [AdminGuard],
    loadChildren: './admin/admin.module#AdminModule',
    // canLoad: [AdminGuard]
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
