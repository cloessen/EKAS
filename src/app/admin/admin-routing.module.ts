import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './components/personal/personal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'editPersonal',
        pathMatch: 'full',
        // canActivate: [AuthGuard]
      },
      {
        path: 'editPersonal',
        component: PersonalComponent,
        // canActivate: [AuthGuard]
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
