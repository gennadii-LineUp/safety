import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router}    from '@angular/router';
import {ClientService} from '../../../../services/client/client.service';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../../services/site/site.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import { NgForm} from '@angular/forms';
declare var $:any;

@Component({
  selector: 'site-salaries-creation',
  templateUrl: './site-salaries-creation.component.html',
  styleUrls: ['./site-salaries-creation.component.css'],
    providers: [ClientService, SiteService]
})
export class SiteSalariesCreationComponent implements OnInit {
    loading: boolean = false;
    loadingGroupes: boolean = true;
    noGroups: boolean = false;
    loaded: boolean = false;
    errorCreating: string = '';
    successCreating: string = '';

    errorLoad: string = '';

    addNewSalariesAvailable: boolean = true;
    errorSalaries: boolean = false;
    salariesMaxPossible:number;
    salariesUsed:number;


    id_site:number;

    public periodeDeValidite = [
        { value: 'indeterminee', booleanValue: false, display: 'Indéterminée' },
        { value: 'determinee',   booleanValue: true,  display: 'Déterminée' }
    ];

    public employeeGroupes = []; // example: [{ access:false, id:269, name:"group 11" }]
    employees = new EmployeesClass('','','','','','',this.periodeDeValidite[0].booleanValue,'','',0);
    //employees: EmployeesClass[] = [];


    constructor(private clientService: ClientService,
                private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) {}

    ngOnInit() {
        this.getEmployeeGroupes();
        this.datepickerRun();
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
                    this.noGroups = false;
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

                //     let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                // if (errorStatusKnown) {
                //     this.errorLoad = errorStatusKnown;
                //     return;
                // }
                //
                // let error = (JSON.parse(err._body)).errors;
                // if (Object.keys(error).length > 0) {
                //     this.errorLoad = this.errorMessageHandlerService.errorHandler(error);
                // }
            });
    }


    @ViewChild('birthDate')  birthDate: ElementRef;
    public getDatepicker() {
        let dd = window.document.getElementsByClassName('datepicker-default')['0'].value;
        console.log(typeof dd + ' getElementsByClassName = ' + dd);
        console.log(typeof this.birthDate.nativeElement.value + ' @ViewChild = ' + this.birthDate.nativeElement.value);
    }


    public submitForm(newEmployeesForm: NgForm) {
        let datepicker_birthDate = window.document.getElementsByClassName('datepicker-default')['0'].value;
        let datepicker_startDate = window.document.getElementsByClassName('datepicker-default')['1'].value;
        let datepicker_endDate = window.document.getElementsByClassName('datepicker-default')['2'].value;

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let newEmployee = new EmployeesClass(newEmployeesForm.value.name,
                                                newEmployeesForm.value.surname,
                                                newEmployeesForm.value.email,
                                                newEmployeesForm.value.post,
                                                datepicker_birthDate,
                                                newEmployeesForm.value.numSecu,
                                                newEmployeesForm.value.validityPeriod,
                                                datepicker_startDate,
                                                datepicker_endDate,
                                                newEmployeesForm.value.employeeGroup);

        console.dir(newEmployee);


        this.siteService.addNewEmployee(newEmployee, this.id_site)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    this.successCreating = "Well done! You've created a new employee.";
                    this.checkFreeSalarieAccount();
                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);

                //      let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
               //  if (errorStatusKnown) {
               //      this.errorLoad = errorStatusKnown;
               //      return;
               //  }
               //
               // let error = (JSON.parse(err._body)).errors;
               //
               //  if (Object.keys(error).length > 0) {
               //      this.errorLoad = this.errorMessageHandlerService.errorHandler(error);
               //  }
            });
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
        $(() =>{
            $( '#birthDate, #startDate, #endDate' ).datepicker();
            $( '#birthDate, #startDate, #endDate' ).datepicker( "option", "changeYear", true );
            //Pass the user selected date format
            $( '#format' ).change(() => {
                $( '#birthDate, #startDate, #endDate' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
            //Pass the user selected date format
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

}
