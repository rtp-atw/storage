import { Component,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialog} from '@angular/material';
import { deviceDetail } from '../products/product';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'my-dialog',
  templateUrl: 'popups.template.html',
})

export class DialogOverview {

  editingDevice: deviceDetail;
  devicelist: Observable<any[]>;
  editedProduct: any = {};
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,public angFire: AngularFireDatabase,
    @Inject(MAT_DIALOG_DATA) public data: any ) { 
      
    this.devicelist = angFire.list('/').valueChanges();
    console.log('key', data);
    this.devicelist.subscribe((items)=> this.editedProduct = items.find(item=>item.key === data));
    console.log('editproduct',this.editedProduct);
    
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}