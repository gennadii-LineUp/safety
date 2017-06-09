import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
// import 'hammerjs';
import {AppRoutingModule} from '../services/routing.module';
import { LeftMenuComponent } from './left-menu-gena/left-menu.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NavbarAdminComponent } from './navbar/navbar-admin/navbar-admin.component';
import { NavbarClientComponent } from './navbar/navbar-client/navbar-client.component';
import { ContentComponent } from './content/content.component';
import { NavbarAdminMobileComponent } from './navbar/navbar-admin-mobile/navbar-admin-mobile.component';
//import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
//import {MdButtonModule, MdInputModule, MdProgressSpinnerModule} from '@angular/material';
//import {ButtonTestComponent} from './ang-material/button-test/button-test.component';
//import {InputTestComponent} from './ang-material/input-test/input-test.component';
//import { SpinnerComponent } from './ang-material/spinner/spinner.component';
import { NavbarForDeleteComponent } from './navbar/navbar-for-delete/navbar-for-delete.component';
import {BackendService} from '../services/backend/backend.service';
import {LoginService} from '../services/login/login.service';
import { ModalStandartComponent, ModalHeader, ModalContent, ModalFooter } from './modal-standart/modal-standart.component';
import {AdminAccessPipe} from '../services/pipes/accessAdmin.pipe';
import { NavbarSiteComponent } from './navbar/navbar-site/navbar-site.component';

// import {ModalModule} from "ng2-modal";


@NgModule({
    imports: [
        CommonModule, BrowserModule, FormsModule, AppRoutingModule,

      //  BrowserAnimationsModule, // ang-material
     //   NoopAnimationsModule,  // ang-material
     //   MdInputModule,   // ang-material
     //   MdButtonModule,  // ang-material
     //   MdProgressSpinnerModule,  // ang-material
        // ModalModule
    ],
    declarations: [
        LeftMenuComponent,  //моя верстка, удалить потом
        ProgressBarComponent,
        NavbarAdminComponent,
        NavbarAdminMobileComponent,
        NavbarClientComponent,
        ContentComponent,

      //  ButtonTestComponent,  // ang-material
     //   InputTestComponent, SpinnerComponent,    // ang-material
        NavbarForDeleteComponent,     //моя верстка, удалить потом
        ModalStandartComponent, ModalHeader, ModalContent, ModalFooter,
        AdminAccessPipe,
        NavbarSiteComponent
    ],
    exports: [
        LeftMenuComponent,  //моя верстка, удалить потом
        ProgressBarComponent,
        NavbarAdminComponent,
        NavbarAdminMobileComponent,
        NavbarClientComponent,
        ContentComponent,

      //  ButtonTestComponent,  // ang-material
      //  InputTestComponent, SpinnerComponent,    // ang-material
        NavbarForDeleteComponent,    //моя верстка, удалить потом
        ModalStandartComponent, ModalHeader, ModalContent, ModalFooter,
        AdminAccessPipe,
        NavbarSiteComponent
        // ModalModule
    ],
    providers: [
        BackendService,
        LoginService
    ],
    bootstrap: []

})
export class SharedModule { }
