import { Component, OnInit } from '@angular/core';
import { User } from "../login/auth";

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'register.template.html'
})

export class RegisterComponent implements OnInit {

    user = {} as User;

    constructor(
        private afAuth: AngularFireAuth,
        private angFire: AngularFireDatabase,
        private router: Router,
    ) { 
        
    }   
    async register(user: User) {
        try {
            const result = this.afAuth.auth.createUserWithEmailAndPassword(user.id, user.password);
            console.log('login', result);
            if (result) {
                this.router.navigateByUrl('/');
            }
        }
    
        catch (e) {
            console.error(e);
        }
    }
    ngOnInit() {      
/*     this.afAuth.authState.subscribe(auth => { 
      if (!auth)  
        this.router.navigateByUrl('/');
      else
        this.router.navigateByUrl('/main');
    }); */
    }
}
