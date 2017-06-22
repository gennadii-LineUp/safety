import { Component, OnInit } from '@angular/core';
import {AdminGuard} from 'app/guards/admin-guard.service';
import {AuthGuard } from 'app/guards/auth-guards.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../services/site/site.service';

@Component({
  selector: 'site-reglages-page',
  templateUrl: './site-reglages-page.component.html',
  styleUrls: ['./site-reglages-page.component.css'],
    providers: [SiteService, AuthGuard, AdminGuard, ErrorMessageHandlerService]
})
export class SiteReglagesPageComponent implements OnInit {
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    showAdminData : boolean = false;

    id_site: number = 0;


    constructor(private authGuard: AuthGuard,
                private adminGuard: AdminGuard,
                private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService){}

  ngOnInit() {
      this.id_site = localStorage.id_site;
      console.log('get from LS ' + this.id_site);

      this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate();
  }


}
