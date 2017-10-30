import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'ng-app',
  templateUrl: 'app.template.html'
})

export class AppComponent implements OnInit {
  appName: string = "Angular Boilerplate";

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((auth) => { 
      console.log('auth',auth);
      if (!auth)  
        this.router.navigateByUrl('/');
      else
        this.router.navigateByUrl('/main');

    });    
  }
}
