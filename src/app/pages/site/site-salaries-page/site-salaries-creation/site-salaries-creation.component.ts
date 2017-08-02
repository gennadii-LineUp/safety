import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router} from '@angular/router';
import {ClientService} from '../../../../services/client/client.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../../services/site/site.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import {DataService} from '../../../../services/DataService.service';
declare var $: any;

@Component({
  selector: 'site-salaries-creation',
  templateUrl: './site-salaries-creation.component.html',
  styleUrls: ['./site-salaries-creation.component.css'],
    providers: [ClientService, SiteService, DataService]
})
export class SiteSalariesCreationComponent implements OnInit, OnDestroy {
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
                public dataService: DataService) {}

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
        this.clientService.getGroupList()
            .subscribe(result => {
                if (result) {
                    if (result.length === 0) {
                        this.noGroups = true;
                    } else {
                        this.noGroups = false;
                    }
                    this.cancellErrorMessage();
                    this.employeeGroupes = result;
                }
            }, (err) => {
                console.log('====error=============');
                this.noGroups = true;
                this.cancellErrorMessage();
                console.log(err);

                if (err.status === 403) {
                    this.errorLoad = "Il n'y a pas de groupes disponibles. Créez-les d'abord ...";
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
      console.log(res);
      setTimeout(() => {
         this.uploadedFile = true;
        // this.loadToServerProfileImageFunction();
      }, 200);
    }
  }

  public loadToServerProfileImageFunction(user_id: number) {
    this.loadingFile = true;
    this.siteService.loadToServerEmployeeImage(this.content, this.id_site, user_id)
      .subscribe(result => {
          console.log(result);
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

        // const _datepicker_birthDate = (this.dataService.stringToDate(datepicker_birthDate, 'dd/MM/yyyy', '/')).toISOString();
        // const _datepicker_startDate = (this.dataService.stringToDate(datepicker_startDate, 'dd/MM/yyyy', '/')).toISOString();
        // const _datepicker_endDate = (this.dataService.stringToDate(datepicker_endDate, 'dd/MM/yyyy', '/')).toISOString();

        const _datepicker_birthDate = this.dataService.stringToISOString(datepicker_birthDate);
        const _datepicker_startDate = this.dataService.stringToISOString(datepicker_startDate);
        const _datepicker_endDate   = this.dataService.stringToISOString(datepicker_endDate);

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        console.log(this.employees);
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

        // this.employees.birthDate = datepicker_birthDate;
        // this.employees.startDate = datepicker_startDate;
        // this.employees.endDate = datepicker_endDate;
        console.log(employeeDates);

        this.siteService.addNewEmployee(employeeDates, this.id_site)
            .subscribe(result => {
                if (result) {
                    if (this.uploadedFile) {
                      this.loadToServerProfileImageFunction(result.userId);
                    } else {
                      this.loading = false;
                      this.loadingFile = false;
                      this.gotoSiteSalariesCreationStep2Page();
                    }
                    localStorage.setItem('id_salarie', '' + result.userId);
                    console.log('===== id NEW SALARIEE: ' + localStorage.id_salarie);
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public hideIndetermineeDatesFunction(e: any) {
        console.dir(e.target.previousElementSibling.id);
        this.hideIndetermineeDates = false;
        if (e.target.previousElementSibling.id === 'indeterminee') {this.hideIndetermineeDates = true; }
    }

    public checkFreeSalarieAccount() {
        this.clientService.employeeCount()
            .subscribe(result => {
                if (result) {
                    this.salariesMaxPossible = result.limitEmployees;
                    this.salariesUsed = result.employeeCount;
                    if (this.salariesMaxPossible === this.salariesUsed) {
                        this.addNewSalariesAvailable = false;
                        this.successCreating = '';
                        this.errorSalaries = true;
                    }
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
