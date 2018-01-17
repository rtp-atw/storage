import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ProductComponent } from './products/product.component';
import { LoginComponent } from "./login/login.component";
import { AddDevice } from "./adddevice/adddevice.component";
import { RegisterComponent } from "./register/register.component";
import { ImportExcel } from "./importexcel/importexcel.component";
import { DialogComponent } from "./popups/popups.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'main', component: ProductComponent },
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'add', component: AddDevice },
            { path: 'import', component: ImportExcel },
            { path: 'popup', component: DialogComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ] , { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }