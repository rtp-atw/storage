import { Component,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { deviceDetail2 } from '../products/product';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'my-dialog',
  templateUrl: 'popups.template.html',
  //styleUrls: ['popups.component.css']
})



export class DialogOverview {

  /* devicelist2: AngularFireList<any>; */

  editingDevice: deviceDetail2;
  devicelist: Observable<any[]>;
  editedProduct: any = {};
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,public angFire: AngularFireDatabase,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.devicelist = angFire.list('/').valueChanges();
    /* this.devicelist2 = angFire.list('/'); */
    console.log('key', data);
    this.devicelist.subscribe((items)=> this.editedProduct = items.find(item=>item.key === data));
    }

  onNoClick(): void {
    console.log('test');
    this.dialogRef.close();
  }

}