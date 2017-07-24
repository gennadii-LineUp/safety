import { Component, OnInit } from '@angular/core';
import {AdminGuard} from 'app/guards/admin-guard.service';
import {AuthGuard } from 'app/guards/auth-guards.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {SiteReglagesClass} from '../../../models/const/site-reglages-class';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';
import {ClientGuard} from '../../../guards/client-guard.service';
import {EmployeesSettingAccessClass} from '../../../models/const/employee-setting-access-class';

@Component({
  selector: 'site-reglages-page',
  templateUrl: './site-reglages-page.component.html',
  styleUrls: ['./site-reglages-page.component.css'],
    providers: [SiteService, AuthGuard, AdminGuard, TableSortService]
})
export class SiteReglagesPageComponent implements OnInit {
    loading = false;
    loadingResponsables = false;
    successUpdate = '';
    errorLoad = '';

    emptyTable = true;
    emptyTable_responsables = true;

    showAdminData = false;
    showEmployee_Admin = false;
    showClientData = false;

    id_site =  0;

    siteReglages = new SiteReglagesClass('', '', '', '', '', false, false, false, false, false, false, '', '');
    siteReglages_copy = new SiteReglagesClass('', '', '', '', '', false, false, false, false, false, false, '', '');
    sortingTarget = '';

    emptyTableMobile = true;
    loadingSalarieUsed = false;
    loaded = false;
    loadedSalarieUsed = false;
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    employee_responsables = [];
    employee_fromSearch = [];
    employee_forAccess = [];
    types_employeeAccess = [
      { id: 1, name: 'general', description: 'acces general, access to the employees and park of the machines of the site' },
      { id: 0, name: 'technical',  description: 'acces technical, access to machinery park of a site' }
    ];

    headers: any[] = [
      { display: 'Nom du salarié', variable: 'name',    filter: 'text' },
      { display: 'Accès',          variable: 'access',  filter: 'text' },
    ];
    mobileHeaders: any[] = [
      { display: 'Nom',       variable: 'name',    filter: 'text' },
      { display: 'n° Sécu',   variable: 'nsecu',  filter: 'text' },
    ];


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
          this.getResponsablesFunction();
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

  public getResponsablesFunction() {
    this.cancellMessages();
    this.loadingResponsables = true;
    this.emptyTable_responsables = false;
    this.siteService.getResponsables(this.id_site)
      .subscribe(result => {
        if (result) {
          this.loadingResponsables = false;
          console.log(result);
          this.employee_responsables = result.items;
          this.emptyTable_responsables = false;
          if (result.items.length === 0) {
            this.emptyTable_responsables = true;
          }
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
        }
      }, (err) => {
        this.loadingResponsables = false;
        this.emptyTable_responsables = true;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getResponsableForUpdateFunction(responsableForUpdate: any) {
    this.setEmptyData();
    this.loadingResponsables = true;
    this.emptyTableMobile = false;
    const employee_forSettingAccess = new EmployeesSettingAccessClass(responsableForUpdate.id,
                                                                    responsableForUpdate.name,
                                                                    responsableForUpdate.surname,
                                                                    responsableForUpdate.numSecu,
                                                                    0);
    this.employee_forAccess.push(employee_forSettingAccess);
    console.log(this.employee_forAccess);
    return true;
    //
    // this.siteService.getOneAttestation(this.id_site, responsableForUpdate.id, '/' + responsableForUpdate.id)
    //   .subscribe(result => {
    //     if (result) {
    //       this.loadingResponsables = false;
    //       console.log(result);
    //       this.attestation.name = result.name;
    //       this.attestation.dateExpires = this.dataService.convertDateForInputView(result.dateExpires);
    //       this.attestation.dateIssue = this.dataService.convertDateForInputView(result.dateIssue);
    //       this.saveButtonCaptionAttest = 'Modifier';
    //       this.itemForChange = result.id;
    //     }
    //   }, (err) => {
    //     this.loadingResponsables = false;
    //     console.log(err);
    //     this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
    //   });
  }

  public deleteResponsableFunction(id_itemForDelete: number) {
    this.loadingResponsables = true;
    this.emptyTable = false;
    console.log(id_itemForDelete);
    this.siteService.deleteResponsable(this.id_site, id_itemForDelete)
      .subscribe(result => {
        if (result) {
          this.cancellMessages();
          console.log(result);
          this.getResponsablesFunction();
        }
      }, (err) => {
        this.loadingResponsables = false;
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

  public findEmployeeByName_searchFunction(name: string, page: any = 1, sort: string) {
    this.setEmptyData();
    this.loading = true;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.siteEmployeeSearch_name;
    }
    this.siteService.findEmployeeByName(_name, page, this.id_site, sort)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.employee_fromSearch = result.items;
          this.loaded = true;
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public takeEmployee_forSettingAccessFunction(employee) {
    console.log(employee);
    this.emptyTableMobile = false;
    const employee_forSettingAccess = new EmployeesSettingAccessClass(employee.id, employee.name, employee.surname, employee.numSecu, 0);

    this.employee_forAccess.push(employee_forSettingAccess);
    for (let i = 0; i < this.employee_fromSearch.length; i++) {
      if (+this.employee_fromSearch[i].id === +employee.id) {
        this.employee_fromSearch.splice(i, 1);
        break;
      }
    }
    console.log(this.employee_forAccess);
  }

  public submitForm() {
    this.cancellMessages();
    this.loading = true;
    // const visites = new VisitesClass(_datepicker_medicalVisit, _datepicker_caces);
    // console.log(visites);
    this.siteService.addEmployeeAccess(this.employee_forAccess, this.id_site)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          this.getResponsablesFunction();
          console.log(result);
          // this.successUpdate = 'Bravo! Vos modifications sont enregistrées.';
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public setEmptyData() {
    this.loaded = false;
    this.cancellMessages();
    this.employee_fromSearch = [];
    this.employee_forAccess = [];
    this.emptyTableMobile = true;
    return true;
  }

  private cancellMessages() {
    this.loading = false;
    this.loadingResponsables = false;
    this.errorLoad = '';
    this.successUpdate = '';
  }

}
