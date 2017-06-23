import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PagesModule} from './pages/pages.module';

import {AppComponent} from './pages/index-page/app.component';
import {AppRoutingModule} from './services/routing.module';
// import {SharedModule} from "./shared/shared.module";
import {AlertModule} from 'ngx-bootstrap';
import {DataService} from './services/DataService.service';
import {BackendService} from './services/backend/backend.service';
import {AuthGuard} from './guards/auth-guards.service';
import {AdminGuard} from './guards/admin-guard.service';
import {ClientGuard} from './guards/client-guard.service';
import {AdminAsClientGuard} from './guards/admin-as-client-guard.service';
import {EmployeeNullGuard} from './guards/employee-null-guard.service';


@NgModule({
  declarations: [ ],
  imports: [
      AlertModule.forRoot(),
      BrowserModule,
      FormsModule,
      HttpModule,
      // SharedModule,
      AppRoutingModule,
      PagesModule
  ],
    exports: [ ],
    providers: [
        AuthGuard, AdminGuard, ClientGuard, AdminAsClientGuard, EmployeeNullGuard, BackendService, DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
