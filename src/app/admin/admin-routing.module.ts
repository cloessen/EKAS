import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { KameradenComponent } from './components/kameraden/kameraden.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'editPersonal'
      },
      {
        path: 'editPersonal',
        component: KameradenComponent
      },
      {
        path: 'editUser',
        component: UsersComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
