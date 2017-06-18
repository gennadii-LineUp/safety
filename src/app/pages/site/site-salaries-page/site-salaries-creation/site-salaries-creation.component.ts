import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router}    from '@angular/router';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../../services/site/site.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import { NgForm} from '@angular/forms';
declare var $:any;

@Component({
  selector: 'site-salaries-creation',
  templateUrl: './site-salaries-creation.component.html',
  styleUrls: ['./site-salaries-creation.component.css'],
    providers: [SiteService, ErrorMessageHandlerService]
})
export class SiteSalariesCreationComponent implements OnInit {
    loading: boolean = false;
    loaded: boolean = false;
    errorCreating: string = '';
    successCreating: string = '';

    employees: EmployeesClass[] = [];
    //employees = new EmployeesClass('','','','','','',true,'','',0);
    errorLoad: string = '';



    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) {}

    ngOnInit() {
        this.datepickerRun();
    }

    // name: string,
    // surname: string,
    // email: string,
    // post: string,
    // birthDate: string,
    // numSecu: string,
    // validityPeriod: boolean = true,
    // startDate: string,
    // endDate: string,
    // employeeGroup: number = 16


    @ViewChild('birthDate')  birthDate: ElementRef;

    public getDatepicker() {

        let dd = window.document.getElementsByClassName('datepicker-default')['0'].value;
        console.log(typeof dd + ' getElementsByClassName = ' + dd);
        console.log(typeof this.birthDate.nativeElement.value + ' @ViewChild = ' + this.birthDate.nativeElement.value);
        // console.log(typeof data);
        // console.log(data);
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
                                                true,
                                                datepicker_startDate,
                                                datepicker_endDate,
                                                16);


        console.dir(newEmployee);


        this.siteService.addNewEmployee(newEmployee)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log('======result====OK======');
                    console.log(result);
                    this.successCreating = "Well done! You've created a new employee.";

                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                console.log(err);

                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }

                let error = (JSON.parse(err._body)).errors;
                //console.log(error);
                //console.log(Object.keys(error).length);

                if (Object.keys(error).length > 0) {
                    this.errorLoad = this.errorMessageHandlerService.errorHandler(error);
                }
            });
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
        this.router.navigate(['/site/salaries']);
        //this.router.navigate(['/site/salarie/ajouter-un-salarie-etap2']);
    }

}
