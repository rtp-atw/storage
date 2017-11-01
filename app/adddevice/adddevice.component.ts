import { Component, OnInit } from '@angular/core';
import { deviceDetail2 } from "../products/product";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { Router } from '@angular/router';

import { HttpModule } from '@angular/http';

import * as papa from 'papaparse';
import * as XLSX from 'ts-xlsx';

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

    constructor(public angFire: AngularFireDatabase,
        private router: Router) {
    
        this.devicelist = angFire.list('/');
  
    }

    ngOnInit() {}

    XLStoJSON(e: any) {
        var excel = e.target.files[0];
        console.log(excel);
/*         var read = XLSX.read('file:///D:\Users\RAtaP\Desktop\Book1.xlsx');
        console.log(read); */
        
        
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
              imgurl: this.picUrl
            });
          });
        });
      }
    saveProduct() {
        var data = this.devicelist.push(this.deviceDetail);
        this.key = data.ref.key;
        console.log(this.key);

        this.uploadPhoto(this.key);
    }
    
}  