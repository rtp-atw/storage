import { Component,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';


@Component({
  moduleId: module.id,
  //selector: 'my-dialog',
  templateUrl: 'popups.template.html',
  //styleUrls: ['popups.component.css']
})

export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    /* @Inject(MAT_DIALOG_DATA) public data: any */) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}