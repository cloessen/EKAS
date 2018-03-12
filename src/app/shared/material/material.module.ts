import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule,
  MatGridListModule, MatToolbarModule, MatRadioModule, MatTooltipModule, MatSnackBarModule, MatMenuModule,
  MatDividerModule, MatDialogModule
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
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule
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
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule
  ],
})
export class MaterialModule { }
