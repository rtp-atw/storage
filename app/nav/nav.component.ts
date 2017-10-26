import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  moduleId: module.id,
  selector: 'ng-nav',
  templateUrl: 'nav.template.html'
})

export class NavbarComponent {
  appName: string = "Supplies Checking By Google Firebase";
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { 
    
  }
  
  logout() {
    this.afAuth.auth.signOut();
    console.log('logout');
    this.router.navigateByUrl('/');
  }
}
