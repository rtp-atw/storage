import { Component, OnInit ,Inject } from '@angular/core';
import { deviceDetail } from './product';
import { AddDevice } from "../adddevice/adddevice.component";

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { Router } from '@angular/router';

import {MatDialogRef,MatDialog,MAT_DIALOG_DATA} from '@angular/material';

@Component({
    moduleId: module.id,
    templateUrl: 'product.template.html',
    
})

export class ProductComponent implements OnInit {
  editProductForm: boolean = false;
  editedProduct: any = {};
  currentUID: any;
  devicelist: Observable<any[]>;
  devicelist2: AngularFireList<any>;
  editingDevice: deviceDetail;
  file: any; picUrl: any;
  constructor(
    private afAuth: AngularFireAuth,
    public angFire: AngularFireDatabase,
    private router: Router,
    private addDevice : AddDevice,
    public dialog: MatDialog,
    ) {  
    this.devicelist = angFire.list('/').valueChanges();
    this.devicelist2 = angFire.list('/');
    }
  ngOnInit() {
    this.afAuth.authState.subscribe((auth) => { 
      this.currentUID = auth.uid;
      console.log(this.currentUID);
      console.log(auth);
    });    
  }
  openDialog(deviceKey: any): void {
    console.log('dialogkey',deviceKey);
    let dialogRef = this.dialog.open(EditDialog, {
      width:  '1200px',
      data: deviceKey
    });
  } 

  toAddDevice() {
    this.router.navigateByUrl('/add');
  }
  removeProduct(deviceKey:any) {
    if (confirm('Are you sure you want to delete this device?')) {
      if(deviceKey){
        this.devicelist2.remove(deviceKey);
      }
      console.log('key',deviceKey);
    } 
    else {
      console.log('back');
    }  
  }

}


@Component({
  moduleId: module.id,
  selector: 'product.edit.dialog',
  templateUrl: 'product.edit.dialog.html',
})
export class EditDialog {

  editingDevice: deviceDetail;
  devicelist: Observable<any[]>;
  editedProduct: any = {};
  file: any;

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,private angFire: AngularFireDatabase,private addDevice:AddDevice,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.devicelist = angFire.list('/').valueChanges();
      console.log('key', data);
      this.devicelist.subscribe((items)=> this.editedProduct = items.find(item=>item.key === data));
      console.log('editproduct',this.editedProduct);

     }

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateProduct(deviceKey:any,editedProduct:deviceDetail) {

    console.log('dataUpdate',editedProduct);
    console.log('keyUpdate',deviceKey);
    this.addDevice.saveProduct(deviceKey,editedProduct,this.file);
    this.dialogRef.close();

  }
  
  selectFile(e:any) {
    console.log(e);
    this.file = e.target.files[0]
  }
}
