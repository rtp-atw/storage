import { Component, OnInit } from '@angular/core';
import { deviceDetail2 } from "../products/product";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'adddevice.template.html'
})

export class AddDevice implements OnInit {
    
    deviceDetails: deviceDetail2[] = [];

    devicelist: AngularFireList<any>;
    storageRef = firebase.storage().ref();
    picUrl: any;
    data :Array<Array<any>>;
    counter = 1;
    limit = 3;

    constructor(public angFire: AngularFireDatabase,
        private router: Router) {

        this.devicelist = angFire.list('/');
        this.deviceDetails = [{}];
    }

    ngOnInit() {}

    XLStoJSON(e: any) {
        var excel = e.target.files[0];
        console.log(excel);
    }

    toMain() {
        this.router.navigateByUrl('/main');
    }
    selectFile(e:any, index: number) {
        console.log(index);
        this.deviceDetails[index].file = e.target.files[0];
    }


    uploadPhoto(deviceKey:any, file:any) {
        this.storageRef.child("Device/" + file.name).put(file).then((snapshot) => {
          console.log(snapshot);
          this.storageRef.child("Device/" + file.name).getDownloadURL().then((url) => {
            const picUrl = url;      
            console.log('url', picUrl);
            this.devicelist.update(deviceKey,{
              imgurl: picUrl,
              key: deviceKey
            });
            this.router.navigateByUrl('/');
          });
        });
      }
      
    saveProduct(deviceKey:any,editedProduct:deviceDetail2,newfile:any) {
        if(deviceKey) {
            this.devicelist.update(deviceKey,{
                id: editedProduct.id,
                serialnumber: editedProduct.serialnumber,
                name: editedProduct.name,
                detail: editedProduct.detail,
                importdate: editedProduct.importdate,
                location_storage: editedProduct.location_storage,
                status: editedProduct.status,
                imgurl : editedProduct.imgurl,
                key:editedProduct.key  
            });
            
            this.uploadPhoto(deviceKey, newfile);
        }
        else {
            console.log('save',this.deviceDetails[0]);      
            this.deviceDetails.forEach(device=>{
                if(device && device.id){
                    var data = this.devicelist.push(device);
                    console.log(data.ref.key);
                    this.uploadPhoto(data.ref.key, device.file);
                }
            });  
        }
    }

    addInput(){
        if(this.deviceDetails.length <3){
            this.deviceDetails.push({});
        }
        else{
            alert("Limite");
        }
        
    }   
    toExcelImport(){
        this.router.navigateByUrl('/import');
    }
    
    
}  