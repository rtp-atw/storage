import { Component, OnInit } from '@angular/core';
import { deviceDetail } from './product';
import { AddDevice } from "../adddevice/adddevice.component";

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { Router } from '@angular/router';

import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
import {DialogOverview} from '../popups/popups.component';

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
  keycheck(deviceKey:any){
    console.log(deviceKey);
  }
  openDialog(deviceKey: any): void {
    console.log('dialogkey',deviceKey);
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      data: deviceKey });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    })
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

  updateProduct(deviceKey:any,editedProduct:deviceDetail) {

    console.log('dataUpdate',editedProduct);
    console.log('keyUpdate',deviceKey);
    this.addDevice.saveProduct(deviceKey,editedProduct,this.file);

    this.editProductForm = false;
  }
  
  selectFile(e:any) {
    console.log(e);
    this.file = e.target.files[0]
  }

}
