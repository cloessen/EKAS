import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule,
  MatGridListModule, MatToolbarModule, MatRadioModule, MatTooltipModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatRadioModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatRadioModule,
    MatTooltipModule
  ],
})
export class MaterialModule { }
