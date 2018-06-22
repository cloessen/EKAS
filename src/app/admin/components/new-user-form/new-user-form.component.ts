import { Component, Inject, OnInit } from '@angular/core';
import { Kamerad } from '../../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KameradenService } from '../../../shared/kameraden.service';
import { UIService } from '../../../shared/ui.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {

  public isLoading$ = this._UI.isLoading$;

  newUserForm = new FormGroup({
    lastName: new FormControl(null , Validators.required),
    firstName: new FormControl(null, Validators.required),
    rfid: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3,}$/)]),
    funktionen: new FormGroup({
      GF: new FormControl(false),
      ZF: new FormControl(false),
      CE: new FormControl(false),
      PA: new FormControl(false),
      saw: new FormControl(false),
      gsg: new FormControl(false),
      RS: new FormControl(false),
      NS: new FormControl(false),
      eva: new FormControl(false),
      log: new FormControl(false),
      owf: new FormControl(false),
      gwf: new FormControl(false)
    })

  });
  get lastName(){
    return this.newUserForm.get('lastName');
  }
  get firstName(){
    return this.newUserForm.get('firstName');
  }
  get rfid(){
    return this.newUserForm.get('rfid');
  }
  get funktionen(){
    return this.newUserForm.get('funktionen');
  }
  get GF(){
    return this.funktionen.get('GF');
  }
  get ZF(){
    return this.funktionen.get('ZF');
  }
  get OWF(){
    return this.funktionen.get('owf');
  }
  get GWF(){
    return this.funktionen.get('gwf');
  }


  constructor(private _UI: UIService,
              private firebase: KameradenService,
              // @Inject(MAT_DIALOG_DATA) public data: Kamerad,
              // public dialogRef: MatDialogRef<NewUserFormComponent>
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._UI.isLoading$.next(true);
    // this.dialogRef.close();
    const newKamerad: Kamerad = this.newUserForm.value;
    newKamerad.anwesend = false;
    for (let x in newKamerad.funktionen) {
      if (!newKamerad.funktionen[x]) {
        newKamerad.funktionen[x] = false;
      }
    }
    if (!newKamerad.funktionen.GF) {
      newKamerad.funktionen.GF = false;
    }
    if (!newKamerad.funktionen.ZF) {
      newKamerad.funktionen.ZF = false;
    }
    if (!newKamerad.funktionen.owf) {
      newKamerad.funktionen.owf = false;
    }
    if (!newKamerad.funktionen.gwf) {
      newKamerad.funktionen.gwf = false;
    }
    this.firebase.saveNewKamerad(newKamerad)
      .then(() => {
        this._UI.isLoading$.next(false);
        this._UI.showSnackBar('Neuer Kamerad erfolgreich gespeichert', 2500);
      })
      .catch((error) => {
        this._UI.isLoading$.next(false);
        this._UI.showSnackBar(error.message, 3000);
      });
  }

  checkDisables(e?) {
    switch (e.source.name) {
      case 'GF':
        e.checked ? this.ZF.disable() : this.ZF.enable();
        e.checked ? this.OWF.disable() : this.OWF.enable();
        e.checked ? this.GWF.disable() : this.GWF.enable();
        break;
      case 'ZF':
        e.checked ? this.GF.disable() : this.GF.enable();
        e.checked ? this.OWF.disable() : this.OWF.enable();
        e.checked ? this.GWF.disable() : this.GWF.enable();
        break;
      case 'owf':
        e.checked ? this.GF.disable() : this.GF.enable();
        e.checked ? this.ZF.disable() : this.ZF.enable();
        e.checked ? this.GWF.disable() : this.GWF.enable();
        break;
      case 'gwf':
        e.checked ? this.GF.disable() : this.GF.enable();
        e.checked ? this.ZF.disable() : this.ZF.enable();
        e.checked ? this.OWF.disable() : this.OWF.enable();
        break;
      default:
        console.log('Dieser Fall sollte nicht auftreten! FEHLER CODE 0001');
        this._UI.showSnackBar(`Ein schwerer Fehler ist aufgereten!
        Bitte schicke eine E-mail mit Informationen zum Ablauf und dem Fehlercode: 0001 an: admin@ekas.app`, 10000);
    }
  }
  onCancel() {
    // this.dialogRef.close();
  }

}
