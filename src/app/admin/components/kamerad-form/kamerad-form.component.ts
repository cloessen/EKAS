import { element } from 'protractor';
import { Component, Input, OnInit } from '@angular/core';
import { Kamerad } from '../../../shared/interfaces';
import { FirestoreService } from '../../../shared/firestore.service';

@Component({
  selector: 'app-kamerad-form',
  templateUrl: './kamerad-form.component.html',
  styleUrls: ['./kamerad-form.component.scss']
})
export class KameradFormComponent implements OnInit {

  @Input() check1 = false;
  @Input() check2 = false;

  @Input('personal') kamerad: Kamerad;

  public modal: any;

  constructor(private firebase: FirestoreService) { }

  ngOnInit() {
  }
  onDelete(kamerad: Kamerad) {
    if (this.check1 && this.check2) {
      this.firebase.deleteKamerad(kamerad).then(() => {
        this.check1 = false;
        this.check2 = false;
      });
    }
    else {
      console.log('warum wurde diese Funktion ausgeführt? nicht beide Haken zum löschen gesetzt!');
    }
  }

  onSubmit(form) {
    const updatedKamerad: Kamerad = form.value;
    this.firebase.updateKamerad(updatedKamerad).then(() => console.log('updated')).catch((err) => console.log(err));
    //
  }

}
