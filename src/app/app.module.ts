import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PagesModule} from './pages/pages.module';
import {AppComponent} from './pages/index-page/app.component';
import {AppRoutingModule} from './services/routing.module';
import {AlertModule} from 'ngx-bootstrap';
import {DataService} from './services/DataService.service';
import {BackendService} from './services/backend/backend.service';
import {AuthGuard} from './guards/auth-guards.service';
import {AdminGuard} from './guards/admin-guard.service';
import {ClientGuard} from './guards/client-guard.service';
import {AdminAsClientGuard} from './guards/admin-as-client-guard.service';
import {EmployeeNullGuard} from './guards/employee-null-guard.service';
import {ErrorMessageHandlerService} from './services/error/error-message-handler.service';
import {ClientOrEmployeeAdminGuard} from './guards/client-eadmin-guard.service';
import {EmployeeAdminGuard} from './guards/employee-admin-guard.service';
import {EmployeeTechGuard} from './guards/employee-technical-guard.service';
import {EmployeeGeneralGuard} from './guards/employee-general-guard.service';
import {ClientOrEmplAdminOrEmplGeneralOrEmplTechnicGuard} from './guards/client-eadmin-egener-etech-guard.service';
import {ClientOrEmplAdminOrEmplGeneralGuard} from './guards/client-eadmin-egener-guard.service';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [ ],
  imports: [
      AlertModule.forRoot(),
      BrowserModule,
      FormsModule,
      HttpModule,
      // SharedModule,
      AppRoutingModule,
      PagesModule,
      QRCodeModule
  ],
    exports: [ ],
    providers: [
        AuthGuard, AdminGuard, ClientGuard, EmployeeTechGuard, EmployeeGeneralGuard, ClientOrEmplAdminOrEmplGeneralOrEmplTechnicGuard,
        AdminAsClientGuard, EmployeeNullGuard, ClientOrEmployeeAdminGuard, EmployeeAdminGuard, ClientOrEmplAdminOrEmplGeneralGuard,
        ErrorMessageHandlerService, BackendService, DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
