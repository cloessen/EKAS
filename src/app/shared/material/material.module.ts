import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule,
  MatGridListModule, MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatToolbarModule],
})
export class MaterialModule { }
