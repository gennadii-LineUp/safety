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
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'site-reglages-page',
  templateUrl: './site-reglages-page.component.html',
  styleUrls: ['./site-reglages-page.component.css'],
    providers: [SiteService, AuthGuard, AdminGuard, TableSortService, BackendService ]
})
export class SiteReglagesPageComponent  extends BasePageComponent implements OnInit {
    loading = false;
    loadingResponsables = false;
    successUpdate = '';
    errorLoad = '';

    emptyTable = true;
    emptyTable_responsables = true;

    showAdminData = false;
    showEmployee_Admin = false;
    showClientData = false;
    saveButtonCaption = 'Ajouter';
    id_site =  0;

    siteReglages = new SiteReglagesClass('', '', '', '', '', false, false, false, false, false, false, '', '');

    emptyTableMobile = true;
    loaded = false;
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';
    itemForChange = 0;

    loadingFile = false;
    loadingFileSignature = false;
    loadingFileTampon = false;
    uploadedFile = false;
    content: any;
    showImg = false;
    file: File;
    userHasChoosenFile = false;
    imgServer: any;

    employee_responsables = [];
    employee_fromSearch = [];
    employee_forAccess_arr = [];
    employee_forAccess_obj: any = {};
    checkedAccess: number;
    types_employeeAccess = [
      { id: 1, name: 'general', description: 'acces general, access to the employees and park of the machines of the site' },
      { id: 0, name: 'technical',  description: 'acces technical, access to machinery park of a site' }
    ];

    sortingTarget = '';
    headers: any[] = [
      { display: 'Nom du salarié', variable: 'name',        filter: 'text' },
      { display: 'Accès',          variable: 'responsible', filter: 'text' },
    ];
    mobileHeaders: any[] = [
      { display: 'Nom',       variable: 'name',    filter: 'text' },
      { display: 'n° Sécu',   variable: 'nsecu',  filter: 'text' },
    ];


  constructor(public authGuard: AuthGuard,
              public adminGuard: AdminGuard,
              public employeeAdminGuard: EmployeeAdminGuard,
              public clientGuard: ClientGuard,
              public siteService: SiteService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public tableSortService: TableSortService,
              public backendService: BackendService) { super(); }

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

  public getSortingTarget() {
    this.sortingTarget = this.tableSortService._getSortingTarget();
  }

  public getReglagesFunction() {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    this.doRequest(this.siteService, 'getReglages', [this.id_site], result => {
          this.getResponsablesFunction('');
          this.loading = false;
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
          this.loadingFile = true;
          setTimeout(() => {
            this.getFromServerProfileImageFunction();
          }, 100);
      }, (err) => {
        this.loading = false;
        this.emptyTable = true;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getResponsablesFunction(sort: string) {
    this.cancellMessages();
    this.loadingResponsables = true;
    this.emptyTable_responsables = false;
    this.doRequest(this.siteService, 'getResponsables', [this.id_site, sort], result => {
          this.loadingResponsables = false;
          this.employee_responsables = result.items;
          this.emptyTable_responsables = false;
          if (result.items.length === 0) {
            this.emptyTable_responsables = true;
          }
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
      }, (err) => {
        this.loadingResponsables = false;
        this.emptyTable_responsables = true;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getResponsableForUpdateFunction(responsableForUpdate: any) {
    this.setEmptyData();
    this.modalOpen();
    this.saveButtonCaption = 'Modifier';
    this.loadingResponsables = true;
    this.emptyTableMobile = false;
    this.itemForChange = responsableForUpdate.id;
    const employee_forSettingAccess = new EmployeesSettingAccessClass(responsableForUpdate.id,
                                                                    responsableForUpdate.name,
                                                                    responsableForUpdate.surname,
                                                                    responsableForUpdate.numSecu,
                                                                    responsableForUpdate.responsible);
    this.employee_forAccess_obj.responsible = responsableForUpdate.responsible;
    this.employee_forAccess_arr.push(employee_forSettingAccess);
    return true;
  }

  public deleteResponsableFunction(id_itemForDelete: number) {
    this.loadingResponsables = true;
    this.emptyTable = false;
    this.doRequest(this.siteService, 'deleteResponsable', [this.id_site, id_itemForDelete], result => {
          this.cancellMessages();
          this.getResponsablesFunction('');
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

      this.doRequest(this.siteService, 'addNewReglages', [this.siteReglages, this.id_site], result => {
            this.loading = false;
            this.successUpdate = 'Bravo! Vos modifications sont enregistrées.';
            setTimeout(() => {
              this.siteService.tableMobileViewInit();
            }, 100);
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
    this.doRequest(this.siteService, 'findEmployeeByName', [_name, page, this.id_site, sort], result => {
          this.loading = false;
          this.employee_fromSearch = result.items;
          this.loaded = true;
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public takeEmployee_forSettingAccessFunction(employee) {
    this.emptyTableMobile = false;
    const employee_forSettingAccess = new EmployeesSettingAccessClass(employee.id, employee.name, employee.surname, employee.numSecu, 1);

    this.employee_forAccess_arr.push(employee_forSettingAccess);
    for (let i = 0; i < this.employee_fromSearch.length; i++) {
      if (+this.employee_fromSearch[i].id === +employee.id) {
        this.employee_fromSearch.splice(i, 1);
        break;
      }
    }
  }

  public showCheckedAccessFunction(type: number) {
    this.checkedAccess = type;
    this.employee_forAccess_obj.responsible = this.checkedAccess;
  }

  public submitForm() {
    this.cancellMessages();
    this.loading = true;
    let employeeAccess: any;
    let urlOption = '';
    if (this.itemForChange) {
      urlOption = '/' + this.itemForChange;
      this.saveButtonCaption = 'Modifier';
      employeeAccess = this.employee_forAccess_obj; // object
    } else {
      employeeAccess = this.employee_forAccess_arr; // array
    }

    this.doRequest(this.siteService, 'addEmployeeAccess', [employeeAccess, this.id_site, urlOption], result => {
          // modal close /////////
          const _modal = document.getElementById('myModal').firstElementChild;
          _modal.classList.add('hidden');
          const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
          (<HTMLScriptElement>modal_bg).classList.add('hidden');
          /////////
          this.getResponsablesFunction('');
          if (this.itemForChange) {
            this.saveButtonCaption = 'Ajouter';
            this.itemForChange = 0;
            this.successUpdate = 'Bravo! Vos modifications sont enregistrées.';
          }
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
          this.loading = false;
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public fileChange(event) {
    this.uploadedFile = false;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.userHasChoosenFile = true;
      this.file = fileList[0];

      let reader = new FileReader();
      reader.onload = (e) => {
        this.content = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);

      this.loadingFile = true;
      setTimeout(() => {
        this.loadToServerProfileImageFunction();
      }, 1000);
    }
  }

  public loadToServerProfileImageFunction() {
    this.siteService.loadToServerProfileImage(this.content, this.id_site)
      .subscribe(result => {
          setTimeout(() => {
            this.getFromServerProfileImageFunction();
          }, 100);
      }, (err) => {
        this.loadingFile = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getFromServerProfileImageFunction() {
    this.loadingFile = true;
    this.uploadedFile = false;
    this.doRequest(this.siteService, 'getFromServerProfileImage', [this.id_site], result => {
          this.loadingFile = false;
          this.showImg = true;
          const src = 'data:' + result.contentType + ';base64,';
          this.imgServer = src + result.content;
      }, (err) => {
        this.loadingFile = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public fileChangeSignature(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.userHasChoosenFile = true;
      this.file = fileList[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.content = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);
      this.loadingFileSignature = true;
      setTimeout(() => {
        this.loadToServerSignatureFunction();
      }, 1000);
    }
  }

  public loadToServerSignatureFunction() {
    this.siteService.loadToServerSignature(this.content, this.id_site)
      .subscribe(result => {
          this.loadingFileSignature = false;
          this.successUpdate = 'La signature est chargée.';
      }, (err) => {
        this.loadingFile = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public fileChangeTampon(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.userHasChoosenFile = true;
      this.file = fileList[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.content = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);
      this.loadingFileTampon = true;
      setTimeout(() => {
        this.loadToServerTamponFunction();
      }, 1000);
    }
  }

  public loadToServerTamponFunction() {
    this.siteService.loadToServerTampon(this.content, this.id_site)
      .subscribe(result => {
        this.loadingFileTampon = false;
        this.successUpdate = 'Le tampon est chargée.';
      }, (err) => {
        this.loadingFile = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public modalOpen() {
    const _modal = document.getElementById('myModal').firstElementChild;
    if (_modal) {_modal.classList.remove('hidden'); }
    const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
    if (modal_bg) {(<HTMLScriptElement>modal_bg).classList.remove('hidden'); }
  }

  public setEmptyData() {
    this.loaded = false;
    this.cancellMessages();
    this.employee_fromSearch = [];
    this.employee_forAccess_arr = [];
    this.emptyTableMobile = true;
    return true;
  }

  public cancellMessages() {
    this.loading = false;
    this.loadingResponsables = false;
    this.errorLoad = '';
    this.successUpdate = '';
  }

}
