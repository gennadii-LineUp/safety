import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router}    from '@angular/router';
import {ClientService} from '../../../../services/client/client.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../../services/site/site.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import { NgForm} from '@angular/forms';
import {DataService} from "../../../../services/DataService.service";
import {EmployeesClassDates} from "../../../../models/const/employees-dates-class";
declare var $:any;

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

    addNewSalariesAvailable = true;
    errorSalaries = false;
    salariesMaxPossible: number;
    salariesUsed: number;


    id_site: number;

    public periodeDeValidite = [
        { value: 'indeterminee', booleanValue: false, display: 'Indéterminée' },
        { value: 'determinee',   booleanValue: true,  display: 'Déterminée' }
    ];

    public employeeGroupes = []; // example: [{ access:false, id:269, name:"group 11" }]
    employees = new EmployeesClass('', '', '', '', '', '', this.periodeDeValidite[0].booleanValue, '', '', 0);
    //employees: EmployeesClass[] = [];


    constructor(private clientService: ClientService,
                private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router,
                private dataService: DataService) {}

    ngOnInit() {
        this.getEmployeeGroupes();
        this.datepickerRun();
        this.checkFreeSalarieAccount();
        this.id_site = localStorage.id_site;
        window.document.querySelectorAll('ul.list-unstyled li:nth-of-type(5)')['0'].classList.add('active');
    }

    ngOnDestroy() {
        window.document.querySelectorAll('ul.list-unstyled li:nth-of-type(5)')['0'].classList.remove('active');
    }


    public getEmployeeGroupes() {
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


    // @ViewChild('birthDate')  birthDate: ElementRef;
    // public getDatepicker() {
    //     let dd = window.document.getElementsByClassName('datepicker-default')['0'].value;
    //     console.log(typeof dd + ' getElementsByClassName = ' + dd);
    //     console.log(typeof this.birthDate.nativeElement.value + ' @ViewChild = ' + this.birthDate.nativeElement.value);
    // }

    loadingFile = false;
    uploadedFile = false;
    file: File;
    userHasChoosenFile = false;
    public fileChange(event) {
        // this.loadingFile = true;
        this.uploadedFile = false;
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.userHasChoosenFile = true;
            this.file = fileList[0];

            if (this.userHasChoosenFile) {
                this.loadingFile = true;
                this.clientService.loadToServerProfileImage(this.file)
                    .subscribe(result => {
                        if (result) {
                            console.log(result);

                            // setTimeout(() => {
                            //     this.clientService.getProfileImage()
                            //         .subscribe(result => {
                            //             if (result) {
                                             this.loadingFile = false;
                                             this.uploadedFile = true;
                            //                 console.log(result);
                            //                 // this.successUpdate = "Well done! You've updated your settings.";
                            //             }
                            //         }, (err) => {
                            //             this.loadingFile = false;
                            //             console.log(err);
                            //             this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
                            //         });
                            // }, 1000);
                            // this.successUpdate = "Well done! You've updated your settings.";
                        }
                    }, (err) => {
                        this.loadingFile = false;
                        console.log(err);
                        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
                    });
            }
            else {
                // this.successUpdate = "Well done! You've updated your settings.";
            }

        }
    }


    public submitForm(newEmployeesForm: NgForm) {
        const datepicker_birthDate = window.document.getElementsByClassName('datepicker-default')['0'].value;
        const datepicker_startDate = window.document.getElementsByClassName('datepicker-default')['1'].value || '';
        const datepicker_endDate   = window.document.getElementsByClassName('datepicker-default')['2'].value || '';

        // const _datepicker_birthDate = (this.dataService.stringToDate(datepicker_birthDate, 'dd/MM/yyyy', '/')).toISOString();
        // const _datepicker_startDate = (this.dataService.stringToDate(datepicker_startDate, 'dd/MM/yyyy', '/')).toISOString();
        // const _datepicker_endDate = (this.dataService.stringToDate(datepicker_endDate, 'dd/MM/yyyy', '/')).toISOString();

        const _datepicker_birthDate = this.dataService.convertDateFromInputeToServer(datepicker_birthDate);
        const _datepicker_startDate = this.dataService.convertDateFromInputeToServer(datepicker_startDate);
        const _datepicker_endDate   = this.dataService.convertDateFromInputeToServer(datepicker_endDate);

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

         const employeeDates = new EmployeesClass(newEmployeesForm.value.name,
                                                       newEmployeesForm.value.surname,
                                                       newEmployeesForm.value.email,
                                                       newEmployeesForm.value.post,
                                                       _datepicker_birthDate,
                                                       newEmployeesForm.value.numSecu,
                                                       newEmployeesForm.value.validityPeriod,
                                                       _datepicker_startDate,
                                                       _datepicker_endDate,
                                                       newEmployeesForm.value.employeeGroup);

        // this.employees.birthDate = datepicker_birthDate;
        // this.employees.startDate = datepicker_startDate;
        // this.employees.endDate = datepicker_endDate;
        console.log(employeeDates);

        this.siteService.addNewEmployee(employeeDates, this.id_site)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    localStorage.setItem('id_salarie', '' + result.userId);
                    console.log('===== id NEW SALARIEE: ' + localStorage.id_salarie);
                    setTimeout(() => {
                        this.gotoSiteSalariesCreationStep2Page();
                    }, 1000);
                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }
    hideIndetermineeDates = true;
    public hideIndetermineeDatesFunction(e: any) {
        console.dir(e.target.previousElementSibling.id);
        this.hideIndetermineeDates = false;
        if (e.target.previousElementSibling.id === 'indeterminee') {
            this.hideIndetermineeDates = true;
        }
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


    ngAfterViewChecked () {
        let timeoutId = setTimeout(() => {
            this.highlightActiveMenu();
        }, 1000);
        clearTimeout(timeoutId);
    }

    highlightActiveMenu() {
        console.log('highlightActiveMenu');
        let menuItem = window.document.getElementById('siteSalariesMenu');//siteSalariesMenu
      console.dir(menuItem);
      //menuItem.classList.add('active');
      console.log('highlightActiveMenu 55555');
  }

    datepickerRun() {
        //Datepicker Popups calender to Choose date
        $(() => {
            this.dataService.datepickerFranceFormat();
            $( '#birthDate, #startDate, #endDate' ).datepicker();
            $( '#birthDate, #startDate, #endDate' ).datepicker( "option", "changeYear", true );
            $( '#format' ).change(() => {
                $( '#birthDate, #startDate, #endDate' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }

    private cancellErrorMessage() {
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
