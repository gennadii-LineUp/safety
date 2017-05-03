import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import 'hammerjs';
import {AppRoutingModule} from '../services/routing.module';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarClientComponent } from './navbar-client/navbar-client.component';
import { ContentComponent } from './content/content.component';
import { NavbarAdminMobileComponent } from './navbar-admin-mobile/navbar-admin-mobile.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdInputModule, MdProgressSpinnerModule} from '@angular/material';
import {ButtonTestComponent} from './ang-material/button-test/button-test.component';
import {InputTestComponent} from './ang-material/input-test/input-test.component';
import { SpinnerComponent } from './ang-material/spinner/spinner.component';



@NgModule({
    imports: [
        CommonModule, BrowserModule, FormsModule, AppRoutingModule,

        BrowserAnimationsModule, // ang-material
        NoopAnimationsModule,  // ang-material
        MdInputModule,   // ang-material
        MdButtonModule,  // ang-material
        MdProgressSpinnerModule  // ang-material

    ],
    declarations: [
        LeftMenuComponent,  //моя верстка, удалить потом
        ProgressBarComponent,
        NavbarAdminComponent,
        NavbarAdminMobileComponent,
        NavbarClientComponent,
        ContentComponent,

        ButtonTestComponent,  // ang-material
        InputTestComponent, SpinnerComponent    // ang-material

    ],
    exports: [
        LeftMenuComponent,  //моя верстка, удалить потом
        ProgressBarComponent,
        NavbarAdminComponent,
        NavbarAdminMobileComponent,
        NavbarClientComponent,
        ContentComponent,

        ButtonTestComponent,  // ang-material
        InputTestComponent, SpinnerComponent    // ang-material
    ],
    providers: [],
    bootstrap: []

})
export class SharedModule { }
