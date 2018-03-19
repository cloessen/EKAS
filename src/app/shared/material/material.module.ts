import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule,
  MatGridListModule, MatToolbarModule, MatRadioModule, MatTooltipModule, MatSnackBarModule, MatMenuModule,
  MatDividerModule, MatDialogModule, MatTabsModule
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
    MatDialogModule,
    MatTabsModule
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
    MatDialogModule,
    MatTabsModule
  ],
})
export class MaterialModule { }
