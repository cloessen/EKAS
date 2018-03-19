import { Component, Inject, OnInit } from '@angular/core';
import { Kamerad } from '../../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../../shared/firestore.service';
import { UIService } from '../../../shared/ui.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KameradFormComponent } from '../kamerad-form/kamerad-form.component';

@Component({
  selector: 'app-new-kamerad-form',
  templateUrl: './new-kamerad-form.component.html',
  styleUrls: ['./new-kamerad-form.component.scss']
})
export class NewKameradFormComponent implements OnInit {

  public isLoading$ = this.UI.isLoading$;

  newKameradForm = new FormGroup({
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
    return this.newKameradForm.get('lastName');
  }
  get firstName(){
    return this.newKameradForm.get('firstName');
  }
  get rfid(){
    return this.newKameradForm.get('rfid');
  }
  get funktionen(){
    return this.newKameradForm.get('funktionen');
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


  constructor(private UI: UIService,
              private firebase: FirestoreService,
              @Inject(MAT_DIALOG_DATA) public data: Kamerad,
              public dialogRef: MatDialogRef<NewKameradFormComponent>) { }

  ngOnInit() {
  }

  onSubmit() {
    this.UI.isLoading$.next(true);
    this.dialogRef.close();
    const newKamerad: Kamerad = this.newKameradForm.value;
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
        this.UI.isLoading$.next(false);
        this.UI.showSnackBar('Neuer Kamerad erfolgreich gespeichert', 2500);
      })
      .catch((error) => {
        this.UI.isLoading$.next(false);
        this.UI.showSnackBar(error.message, 3000);
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
        this.UI.showSnackBar(`Ein schwerer Fehler ist aufgereten! Bitte schicke eine E-mail mit Informationen zum Ablauf und dem Fehlercode: 0001 an: s.claussen@me.com`, 10000);
    }
  }
  onCancel() {
    this.dialogRef.close();
  }

}
