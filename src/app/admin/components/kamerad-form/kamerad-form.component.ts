import { Component, Inject, Input, OnInit } from '@angular/core';
import { Kamerad } from '../../../shared/interfaces';
import { KameradenService } from '../../../shared/kameraden.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UIService } from '../../../shared/ui.service';

@Component({
  selector: 'app-kamerad-form',
  templateUrl: './kamerad-form.component.html',
  styleUrls: ['./kamerad-form.component.scss']
})
export class KameradFormComponent implements OnInit {

  check1 = false;
  check2 = false;

  // @Input('personal') kamerad: Kamerad;
  kamerad: Kamerad;

  public modal: any;

  constructor(
    private UI: UIService,
    private firebase: KameradenService,
    @Inject(MAT_DIALOG_DATA) public data: Kamerad,
    public dialogRef: MatDialogRef<KameradFormComponent>) {
  }

  ngOnInit() {
    this.kamerad = this.data;
  }
  onDelete(kamerad: Kamerad) {
    if (this.check1 && this.check2) {
      this.firebase.deleteKamerad(kamerad)
        .catch((error) => this.UI.showSnackBar(error.message, 3000));
      this.dialogRef.close();
    } else {
      console.log('warum wurde diese Funktion ausgeführt? nicht beide Haken zum löschen gesetzt!');
    }
  }

  onSubmit(form) {
    this.dialogRef.close();
    const updatedKamerad: Kamerad = form.value;
    for (const funktion in updatedKamerad.funktionen) {
      if (!updatedKamerad.funktionen[funktion]) {
        updatedKamerad.funktionen[funktion] = false;
      }
    }
    if (!updatedKamerad.funktionen.GF) {
      updatedKamerad.funktionen.GF = false;
    }
    if (!updatedKamerad.funktionen.ZF) {
      updatedKamerad.funktionen.ZF = false;
    }
    if (!updatedKamerad.funktionen.owf) {
      updatedKamerad.funktionen.owf = false;
    }
    if (!updatedKamerad.funktionen.gwf) {
      updatedKamerad.funktionen.gwf = false;
    }
    this.firebase.updateKamerad(updatedKamerad)
      .then(() => this.UI.showSnackBar('Update erfolgreich gespeichert', 2500))
      .catch((error) => this.UI.showSnackBar(error.message, 3000));
  }
  onCancel() {
    this.dialogRef.close();
  }

}
