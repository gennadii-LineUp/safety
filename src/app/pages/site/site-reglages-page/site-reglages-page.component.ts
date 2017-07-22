import { Component, OnInit } from '@angular/core';
import {AdminGuard} from 'app/guards/admin-guard.service';
import {AuthGuard } from 'app/guards/auth-guards.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {SiteReglagesClass} from '../../../models/const/site-reglages-class';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';
import {ClientGuard} from '../../../guards/client-guard.service';

@Component({
  selector: 'site-reglages-page',
  templateUrl: './site-reglages-page.component.html',
  styleUrls: ['./site-reglages-page.component.css'],
    providers: [SiteService, AuthGuard, AdminGuard, TableSortService]
})
export class SiteReglagesPageComponent implements OnInit {
    loading = false;
    successUpdate = '';
    errorLoad = '';

    emptyTable = true;

    showAdminData = false;
    showEmployee_Admin = false;
    showClientData = false;

    id_site =  0;

    siteReglages = new SiteReglagesClass('', '', '', '', '', false, false, false, false, false, false, '', '');
    siteReglages_copy = new SiteReglagesClass('', '', '', '', '', false, false, false, false, false, false, '', '');
    sortingTarget = '';


    constructor(private authGuard: AuthGuard,
                private adminGuard: AdminGuard,
                private employeeAdminGuard: EmployeeAdminGuard,
                private clientGuard: ClientGuard,
                private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private tableSortService: TableSortService) {}

  ngOnInit() {
      this.verifyUserRole();
      this.id_site = localStorage.id_site;
      this.getReglagesFunction();
  }

  public verifyUserRole() {
    this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate();
    this.showEmployee_Admin =  this.employeeAdminGuard.canActivate();
    this.showClientData =  this.clientGuard.canActivate();
  }

  public getReglagesFunction() {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    this.siteService.getReglages(this.id_site)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.siteReglages.name = result.name;
          this.siteReglages.address = result.address;
          this.siteReglages.postalCode = result.postalCode;
          this.siteReglages.city = result.city;
          this.siteReglages.notificationEmails = result.notificationEmails;
          this.siteReglages.cacesSiege = result.cacesSiege;
          this.siteReglages.cacesSite = result.cacesSite;
          this.siteReglages.medicalVisitSiege = result.medicalVisitSiege;
          this.siteReglages.medicalVisitSite = result.medicalVisitSite;
          this.siteReglages.techControlSiege = result.techControlSiege;
          this.siteReglages.techControlSite = result.techControlSite;
          this.siteReglages.signatoryName = result.signatoryName;
          this.siteReglages.signatorySurname = result.signatorySurname;
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
        }
      }, (err) => {
        this.loading = false;
        this.emptyTable = true;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public submitNewReglagesForm() {
      this.cancellMessages();
      this.loading = true;
      this.emptyTable = false;
      this.siteReglages.notificationEmails = (<HTMLInputElement>window.document.querySelectorAll('#notificationEmails')[0]).value;

      this.siteService.addNewReglages(this.siteReglages, this.id_site)
        .subscribe(result => {
          if (result) {
            this.loading = false;
            console.log(result);
            this.successUpdate = 'Bravo! Vos modifications sont enregistrées.';
            setTimeout(() => {
              this.siteService.tableMobileViewInit();
            }, 100);
          }
        }, (err) => {
          this.loading = false;
          this.emptyTable = true;
          console.log(err);
          this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
        });
  }


  private cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
    this.successUpdate = '';
  }

}
