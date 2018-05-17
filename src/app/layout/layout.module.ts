import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from '../overview/overview.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
    imports: [
      SharedModule
  ],
  declarations: [
    LayoutComponent,
    OverviewComponent,
    HeaderComponent]
})
export class LayoutModule { }
