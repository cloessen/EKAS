import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-top',
  templateUrl: './alert-top.component.html',
  styleUrls: ['./alert-top.component.scss']
})
export class AlertTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  resetState(){
    console.log('X clicked');
  }

}
