import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product,deviceDetail2 } from './product';
import { clone } from 'lodash';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    templateUrl: 'product.template.html'
})

export class ProductComponent implements OnInit {

  editProductForm: boolean = false;
  editedProduct: any = {};

  currentUID: any;
  devicelist: Observable<any[]>;
  devicelist2: AngularFireList<any>;
  editingDevice: deviceDetail2;
  file: any; picUrl: any;

  constructor(private _productService: ProductService,
    private afAuth: AngularFireAuth,
    public angFire: AngularFireDatabase,
    private router: Router) { 
    
    this.devicelist = angFire.list('/').valueChanges();
    this.devicelist2 = angFire.list('/');

    var ref = firebase.database().ref();
    ref.on('value',function(datasnapshot){
      var deviceData = datasnapshot.val();
      console.log('datatest',deviceData[0]);

    });
    }

  ngOnInit() {

    this.afAuth.authState.subscribe((auth) => { 
      this.currentUID = auth.uid;
      console.log(this.currentUID);
      console.log(auth);
    });    
  }


  toAddDevice() {
    this.router.navigateByUrl('/add');
  }

  showEditProductForm(deviceKey:any) {
    console.log('key',deviceKey);
    this.editProductForm = true;
    this.devicelist.subscribe((items)=> this.editedProduct = items.find(item=>item.key === deviceKey));
    //this.deviceDetail = clone();
/*     if(!product) {
      this.productForm = false;
      return;
    } */
    
    
  }

  removeProduct(deviceID:any) {
    if(deviceID){
      this.devicelist2.remove(deviceID);
    }
    console.log('key',deviceID);
    //this._productService.deleteProduct(deviceID);
  }

  updateProduct(deviceID:any) {
    console.log('Update',deviceID);   
    //this.devicelist2.update(deviceID,{deviceDetail});
    //this._productService.updateProduct(this.editedProduct);
    //this.editProductForm = false;
    //this.editedProduct = {};
  }

  cancelEdits() {
    //this.editedProduct = {};
    this.editProductForm = false;
  }
  
  selectFile(e:any) {
    console.log(e);
    this.file = e.target.files[0]
}


}
