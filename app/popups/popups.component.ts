import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';


@Component({
  selector: 'my-dialog',
  templateUrl: 'popups.component.html',
  //styleUrls: ['popups.component.css']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>){}
}
