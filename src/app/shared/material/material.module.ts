import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule],
})
export class MaterialModule { }
