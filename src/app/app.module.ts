import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PagesModule} from './pages/pages.module';

import {AppComponent} from './pages/index-page/app.component';
import {AppRoutingModule} from './services/routing.module';
// import {SharedModule} from "./shared/shared.module";
import {AlertModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [

  ],
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
