import { Component, OnInit } from '@angular/core';
import {AdminGuard} from 'app/guards/admin-guard.service';
import {AuthGuard } from 'app/guards/auth-guards.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';

@Component({
  selector: 'site-reglages-page',
  templateUrl: './site-reglages-page.component.html',
  styleUrls: ['./site-reglages-page.component.css'],
    providers: [AuthGuard, AdminGuard, ErrorMessageHandlerService]
})
export class SiteReglagesPageComponent implements OnInit {
    showAdminData : boolean = false;

    constructor(private authGuard: AuthGuard,
                private adminGuard: AdminGuard,
                private errorMessageHandlerService: ErrorMessageHandlerService){}

  ngOnInit() {
      this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate();
  }


}
