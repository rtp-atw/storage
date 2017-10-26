import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ProductComponent } from './products/product.component';
import { NavbarComponent } from './nav/nav.component';

import { ProductService } from './products/product.service';
import { LoginComponent } from "./login/login.component";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


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
                   AngularFireDatabaseModule
                   ],
  declarations: [ AppComponent,
                          ProductComponent,
                          LoginComponent,
                          NavbarComponent
                          ],
  providers: [ ProductService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }