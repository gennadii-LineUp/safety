import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router} from '@angular/router';
import {ClientService} from '../../../../services/client/client.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../../services/site/site.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import {DataService} from '../../../../services/DataService.service';
import {BackendService} from '../../../../services/backend/backend.service';
import {BasePageComponent} from '../../../base/base-page.component';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'site-salaries-creation',
  templateUrl: './site-salaries-creation.component.html',
  styleUrls: ['./site-salaries-creation.component.css'],
    providers: [ClientService, SiteService, DataService, BackendService ]
})
export class SiteSalariesCreationComponent extends BasePageComponent implements OnInit, OnDestroy {
    loading = false;
    loadingGroupes = true;
    noGroups = false;
    loaded = false;
    errorCreating = '';
    successCreating = '';

    errorLoad = '';
    hideIndetermineeDates = true;

    addNewSalariesAvailable = true;
    errorSalaries = false;
    salariesMaxPossible: number;
    salariesUsed: number;

    loadingFile = false;
    uploadedFile = false;
    content: any;
    showImg = false;
    file: File;
    userHasChoosenFile = false;
    imgServer: any;

    id_site: number;

    public periodeDeValidite = [
        { value: 'indeterminee', booleanValue: false, display: 'Indéterminée' },
        { value: 'determinee',   booleanValue: true,  display: 'Déterminée' }
    ];

    public employeeGroupes = []; // example: [{ access:false, id:269, name:"group 11" }]
    employees = new EmployeesClass('', '', '', '', '', '', this.periodeDeValidite[0].booleanValue, '', '', 0);


    constructor(public clientService: ClientService,
                public siteService: SiteService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public router: Router,
                public dataService: DataService,
                public backendService: BackendService) { super(); }

    ngOnInit() {
        this.getEmployeeGroupes();
        this.datepickerRun();
        this.checkFreeSalarieAccount();
        this.id_site = localStorage.id_site;
    }

    ngOnDestroy() {
      // window.document.getElementById('siteSalariesMenu').classList.remove('active');
    }


    public getEmployeeGroupes() {
        // this.siteService.lightActiveMenu();
        this.noGroups = false;
        this.doRequest(this.clientService, 'getGroupList', null, result => {
                    if (result.length === 0) {
                        this.noGroups = true;
                    } else {
                        this.noGroups = false;
                    }
                    this.cancellErrorMessage();
                    this.employeeGroupes = result;
            }, (err) => {
                this.noGroups = true;
                this.cancellErrorMessage();
                console.log(err);

                if (err.status === 403) {
                    this.errorLoad = 'Il n\'y a pas de "Groupes de salariés" disponibles. Créez-les d\'abord ...';
                    return;
                }
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
      let res = reader.readAsDataURL(event.target.files[0]);
      setTimeout(() => {
         this.uploadedFile = true;
         this.showImg = true;
        this.imgServer = this.content.result;
        // this.loadToServerProfileImageFunction();
      }, 100);
    }
  }

  public loadToServerProfileImageFunction(user_id: number) {
    this.loadingFile = true;
    this.siteService.loadToServerEmployeeImage(this.content, this.id_site, user_id)
      .subscribe(result => {
          this.loading = false;
          this.loadingFile = false;
          this.gotoSiteSalariesCreationStep2Page();
      }, (err) => {
        this.loadingFile = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


    public submitForm() {
        const datepicker_birthDate = window.document.getElementsByClassName('datepicker-default')['0'].value;
        const datepicker_startDate = window.document.getElementsByClassName('datepicker-default')['1'].value || '';
        const datepicker_endDate   = window.document.getElementsByClassName('datepicker-default')['2'].value || '';

        // console.log(this.dataService.convertDateFromInputeToServer(datepicker_birthDate)); // equal
        // console.log(moment(datepicker_birthDate, 'DD/MM/YYYY').toISOString());             // equal

        const _datepicker_birthDate = moment(datepicker_birthDate, 'DD/MM/YYYY').toISOString();
        const _datepicker_startDate = moment(datepicker_startDate, 'DD/MM/YYYY').toISOString();
        const _datepicker_endDate = moment(datepicker_endDate, 'DD/MM/YYYY').toISOString();

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        const employeeDates = new EmployeesClass(this.employees.name,
                                                 this.employees.surname,
                                                 this.employees.email,
                                                 this.employees.post,
                                                  _datepicker_birthDate,
                                                 this.employees.numSecu,
                                                 this.employees.validityPeriod,
                                                  _datepicker_startDate,
                                                  _datepicker_endDate,
                                                 this.employees.employeeGroup);

        this.doRequest(this.siteService, 'addNewEmployee', [employeeDates, this.id_site], result => {
                    if (this.uploadedFile) {
                      this.loadToServerProfileImageFunction(result.userId);
                    } else {
                      this.loading = false;
                      this.loadingFile = false;
                      this.gotoSiteSalariesCreationStep2Page();
                    }
                    localStorage.setItem('id_salarie', '' + result.userId);
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public hideIndetermineeDatesFunction(e: any) {
        this.hideIndetermineeDates = false;
        if (e.target.previousElementSibling.id === 'indeterminee') {this.hideIndetermineeDates = true; }
    }

    public checkFreeSalarieAccount() {
        this.doRequest(this.clientService, 'employeeCount', null, result => {
                    this.salariesMaxPossible = result.limitEmployees;
                    this.salariesUsed = result.employeeCount;
                    if (this.salariesMaxPossible === this.salariesUsed) {
                        this.addNewSalariesAvailable = false;
                        this.successCreating = '';
                        this.errorSalaries = true;
                    }
             }, (err) => {
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }
    public cancellErrorSalariesMessages() {
        this.errorSalaries = false;
    }


  public datepickerRun() {
        $(() => {
            this.dataService.datepickerFranceFormat();
          $.datepicker.setDefaults({
            dateFormat: 'dd/mm/yy',
            showOtherMonths: true,
            selectOtherMonths: true,
            changeMonth: true,
            changeYear: true,
            minDate: '01/01/1900'
          });
            $( '#birthDate').datepicker({
              maxDate: '31/12/2007',
              yearRange: '1900:2007'});
            $( '#startDate, #endDate').datepicker({yearRange: '1900:2099'});
            $( '#birthDate, #startDate, #endDate' ).datepicker();
            $( '#birthDate, #startDate, #endDate' ).datepicker( 'option', 'changeYear', true );
            $( '#format' ).change(() => {
                $( '#birthDate, #startDate, #endDate' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }

    public cancellErrorMessage() {
        this.loading = false;
        this.loadingGroupes = false;
        this.errorCreating = '';
        this.errorLoad = '';
    }
    public cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }
    gotoSiteSalariesPage() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/site', this.id_site, 'salaries']);
    }
    gotoSiteSalariesCreationStep2Page() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/site', this.id_site, 'ajouter-un-salarie-etap2']);
    }

}
