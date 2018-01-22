import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ProductComponent } from './products/product.component';
import { NavbarComponent } from './nav/nav.component';
import { DialogOverview } from "./popups/popups.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AddDevice } from "./adddevice/adddevice.component";
import { ImportExcel } from "./importexcel/importexcel.component";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HttpModule } from '@angular/http';

import { MatDialogModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAz_fYMCzETWKow3ibls6bkwq7dhQ_F_Ao",
    authDomain: "storage-55982.firebaseapp.com",
    databaseURL: "https://storage-55982.firebaseio.com",
    projectId: "storage-55982",
    storageBucket: "storage-55982.appspot.com",
    messagingSenderId: "1083390387627"
  }
};

@NgModule({
  imports: [ BrowserModule,
                   FormsModule,
                   AppRoutingModule,
                   AngularFireModule.initializeApp(firebaseConfig.firebase),
                   AngularFirestoreModule, 
                   AngularFireAuthModule,
                   AngularFireDatabaseModule,
                   HttpModule,
                   MatDialogModule,
                   BrowserAnimationsModule
                   ],
  declarations: [ AppComponent,
                          ProductComponent,
                          LoginComponent,
                          RegisterComponent,
                          AddDevice,
                          ImportExcel,
                          NavbarComponent,
                          DialogOverview
                          ],
  providers: [ AddDevice],
  bootstrap: [AppComponent],
/*   entryComponents: [
    DialogOverview 
] */
})

export class AppModule { }