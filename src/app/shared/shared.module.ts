import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../services/routing.module';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NavbarAdminComponent } from './navbar/navbar-admin/navbar-admin.component';
import { NavbarClientComponent } from './navbar/navbar-client/navbar-client.component';
import {BackendService} from '../services/backend/backend.service';
import {LoginService} from '../services/login/login.service';
import {AdminAccessPipe} from '../services/pipes/accessAdmin.pipe';
import { NavbarSiteComponent } from './navbar/navbar-site/navbar-site.component';
import { NavbarSalariesComponent } from './navbar/navbar-salaries/navbar-salaries.component';
import { PaginationComponent } from './pagination/pagination.component';
import {ValidityPeriodPipe} from '../services/pipes/validityPeriodSalarie.pipe';
import {ValueNullPipe} from '../services/pipes/valueNull.pipe';
import {CapitalizePipe} from '../services/pipes/capitalize.pipe';
import {ResponsableSitePipe} from '../services/pipes/responsableSite.pipe';
import {DateFromServerMomentPipe} from '../services/pipes/dateFromServerMoment.pipe';
import {EmployeeAccessPipe} from '../services/pipes/accessEmployee.pipe';


@NgModule({
    imports: [
        CommonModule, BrowserModule, FormsModule, AppRoutingModule,
    ],
    declarations: [
        ProgressBarComponent,
        NavbarAdminComponent,
        NavbarClientComponent,
        AdminAccessPipe,
        ValueNullPipe,
        NavbarSiteComponent,
        NavbarSalariesComponent,
        PaginationComponent,
        ValidityPeriodPipe,
        CapitalizePipe,
        ResponsableSitePipe,
        DateFromServerMomentPipe,
        EmployeeAccessPipe
    ],
    exports: [
        ProgressBarComponent,
        NavbarAdminComponent,
        NavbarClientComponent,
        AdminAccessPipe,
        ValueNullPipe,
        NavbarSiteComponent,
        NavbarSalariesComponent,
        PaginationComponent,
        ValidityPeriodPipe,
        CapitalizePipe,
        ResponsableSitePipe,
        DateFromServerMomentPipe,
        EmployeeAccessPipe
    ],
    providers: [
        BackendService,
        LoginService
    ],
    bootstrap: []

})
export class SharedModule { }
