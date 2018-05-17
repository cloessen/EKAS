import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UIService {

  public isLoading$ = new BehaviorSubject(false);
  public currentFF$ = new BehaviorSubject(null);

  constructor(public snackBar: MatSnackBar) {}

  public showSnackBar(message: string, duration: number) {
    this.snackBar.open(message, null, {
      duration: duration,
      verticalPosition: 'top'
    });
  }

}
