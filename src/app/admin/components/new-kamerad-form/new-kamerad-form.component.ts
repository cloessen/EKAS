import { Component, OnInit } from '@angular/core';
import { Kamerad } from '../../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../../shared/firestore.service';

@Component({
  selector: 'app-new-kamerad-form',
  templateUrl: './new-kamerad-form.component.html',
  styleUrls: ['./new-kamerad-form.component.scss']
})
export class NewKameradFormComponent implements OnInit {

  newKameradForm = new FormGroup({
    lastName: new FormControl(null , Validators.required),
    firstName: new FormControl(null, Validators.required),
    rfid: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3,}$/)]),
    funktionen: new FormGroup({
      GF:new FormControl(false),
      ZF:new FormControl(false),
      CE:new FormControl(false),
      PA:new FormControl(false),
      saw:new FormControl(false),
      gsg:new FormControl(false),
      RS:new FormControl(false),
      NS:new FormControl(false),
      eva:new FormControl(false),
      log:new FormControl(false),
      owf:new FormControl(false),
      gwf:new FormControl(false)
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

  constructor(private firebase: FirestoreService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.newKameradForm);
    let newKamerad: Kamerad = this.newKameradForm.value;
    newKamerad.anwesend = false;
    //   for(let x in newKamerad.funktionen){
    //     if(!newKamerad.funktionen[x]){
    //       newKamerad.funktionen[x] = false;
    //     }
    //   }
    //
    console.log(newKamerad);
    this.firebase.saveNewKamerad(newKamerad);
    //
  }

}
