import { Component, OnInit } from '@angular/core';
import { deviceDetail2 } from "../products/product";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
    moduleId: module.id,
    templateUrl: 'adddevice.template.html'
})

export class AddDevice implements OnInit {
    
    deviceDetail: deviceDetail2[] = [];
    devicelist: AngularFireList<any>;
    storageRef = firebase.storage().ref();
    key: any;
    file: any;
    picUrl: any;
    data :Array<Array<any>>;

    constructor(public angFire: AngularFireDatabase,
        private router: Router) {
    
        this.devicelist = angFire.list('/');
        //const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    }

    ngOnInit() {}

    XLStoJSON(e: any) {
        var excel = e.target.files[0];
        console.log(excel);
    }

    toMain() {
        this.router.navigateByUrl('/main');
    }
    selectFile(e:any) {
        console.log(e);
        this.file = e.target.files[0]
    }


    uploadPhoto(key:any) {
        console.log(this.file);
        this.storageRef.child("Device/" + this.file.name).put(this.file).then((snapshot) => {
          console.log(snapshot);
          this.storageRef.child("Device/" + this.file.name).getDownloadURL().then((url) => {
            this.picUrl = url;      
            console.log('url', this.picUrl);
            this.devicelist.update(key,{
              imgurl: this.picUrl,
              key: this.key
            });
          });
        });
      }

    saveProduct(deviceKey:any,editedProduct:deviceDetail2) {
        if(deviceKey) {
            this.devicelist.update(deviceKey,{editedProduct});
            this.uploadPhoto(deviceKey);
        }
        else {
            var data = this.devicelist.push(this.deviceDetail);
            this.key = data.ref.key;
            console.log(this.key);
            this.uploadPhoto(this.key);
        }

        
    }


    addInput(divName:any){
    var counter = 1;
    var limit = 3;
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "ID: <input type='text'name='id'[(ngModel)]='deviceDetail.id'/></p>";
          
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}
    toExcelImport(){
        this.router.navigateByUrl('/import');
    }
    
}  