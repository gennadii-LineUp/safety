import { Component, OnInit } from '@angular/core';
import {AdminGuard} from 'app/guards/admin-guard.service';
import {AuthGuard } from 'app/guards/auth-guards.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';

@Component({
  selector: 'site-reglages-page',
  templateUrl: './site-reglages-page.component.html',
  styleUrls: ['./site-reglages-page.component.css'],
    providers: [SiteService, AuthGuard, AdminGuard, TableSortService]
})
export class SiteReglagesPageComponent implements OnInit {
    emptyTable = true;
    loading = false;
    loadingSalarieUsed = false;
    loaded = false;
    loadedSalarieUsed = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    showAdminData  = false;

    id_site =  0;


    notificationHeaders: any[] = [
        { display: 'Règle de notification', variable: 'name', filter: 'text' },
    ];


    constructor(private authGuard: AuthGuard,
                private adminGuard: AdminGuard,
                private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private tableSortService: TableSortService){}

  ngOnInit() {
      this.siteService.tableMobileViewInit();
      this.id_site = localStorage.id_site;
      console.log('get from LS ' + this.id_site);

      this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate();
  }

//////////////////////////////
//     this.emptyTable = false;
//
// * .subscribe(result => {
//     *     if (result) {
//
//         if (this.totalItems === 0) {
//             this.emptyTable = true;
//         }
//
//     * }, (err) => {
//
//     this.emptyTable = true;
///////////////////////////////

}
