import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ProductComponent } from './products/product.component';
import { LoginComponent } from "./login/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'main', component: ProductComponent },
            { path: '', component: LoginComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ] , { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }