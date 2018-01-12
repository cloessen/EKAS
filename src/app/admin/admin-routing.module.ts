import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/admin-guard.service';
import { AdminComponent } from './admin.component';
import { PersonalComponent } from './components/personal/personal.component';
import { NewKameradFormComponent } from './components/new-kamerad-form/new-kamerad-form.component';

const adminRoutes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
