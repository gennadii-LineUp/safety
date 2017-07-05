import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router}    from '@angular/router';
import {SiteService} from '../../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {ClientService} from '../../../../services/client/client.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import {NgForm} from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-site-salaries-creation-etap2',
  templateUrl: './site-salaries-creation-etap2.component.html',
  styleUrls: ['./site-salaries-creation-etap2.component.css'],
    providers: [SiteService, ClientService]
})
export class SiteSalariesCreationEtap2Component implements OnInit {
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loadingGroupes: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    errorSalaries: boolean = false;
    salariesMaxPossible:number;
    salariesUsed:number;

    id_site: number;
    id_salarie: number;
    private sub: any;

    checkedGroupFromEtap1:any;

    chariotsElevateurs: boolean = true;
    gruesMobiles: boolean = false;

    Type = [
        { value: 'chariotsElevateurs', display: 'Chariots élévateurs R.389' },
        { value: 'gruesMobiles', display: 'Grues mobiles R.383m' }
    ];

    public employeeGroupes = [];
    employees = new EmployeesClass('','','','','','',true,'','',0);

    constructor(private siteService: SiteService,
                private clientService: ClientService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router,
                private route: ActivatedRoute) { }

    // private id: number;
    // private subscription: Subscription;
    // constructor(private activateRoute: ActivatedRoute){
    //
    //     this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
    // }
    // ngOnDestroy(){
    //     this.subscription.unsubscribe();
    // }


    ngOnInit():void {
        this.id_site = localStorage.id_site;
        this.id_salarie = localStorage.id_salarie;
        // this.sub = this.route.params.subscribe(params => {
        //     this.id_salarie = +params['id_salarie'];
        // });
        this.getEmployeeFromEtap1Function();
        this.tableMobileViewInit();
        this.getEmployeeGroupes();

        window.document.querySelectorAll('ul.list-unstyled li:nth-of-type(5)')['0'].classList.add('active');
        this.datepickerViewInit();
    }


    ngOnDestroy() {
        window.document.querySelectorAll('ul.list-unstyled li:nth-of-type(5)')['0'].classList.remove('active');
    }


    public ShowType(userChoice:string) {
        if (userChoice === 'gruesMobiles') {
            this.chariotsElevateurs = false;
            this.gruesMobiles = true;
        } else {
            this.gruesMobiles = false;
            this.chariotsElevateurs = true;
        }
        console.log(userChoice);

    }

    public getEmployeeFromEtap1Function() {
        this.loading = true;
        this.siteService.getEmployeeFromEtap1(this.id_site, this.id_salarie)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    this.employees = result;
                    this.employees.birthDate = this.siteService.convertDataForInputView(result.birthDate);
                    this.loaded = true;
                    window.setTimeout(() => this.checkedGroupFromEtap1 = result.employeeGroup.id, 1000);
                }
            }, (err) => {
                this.loading = false;
                this.loaded = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public getEmployeeGroupes() {
        this.loadingGroupes = true;
        this.clientService.getGroupList()
            .subscribe(result => {
                if (result) {
                    this.loadingGroupes = false;
                    this.cancellErrorMessage();
                    this.employeeGroupes = result;
                }
            }, (err) => {
                this.cancellErrorMessage();
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public submitModifyEtap1Form(newEmployee2Form: NgForm) {
        let datepicker_birthDate = window.document.getElementsByClassName('datepicker-default')['0'].value;
        // let datepicker_startDate = window.document.getElementsByClassName('datepicker-default')['1'].value;
        // let datepicker_endDate = window.document.getElementsByClassName('datepicker-default')['2'].value;

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        this.employees.birthDate = datepicker_birthDate;
        console.dir(this.employees);

        // this.id_site
        // this.id_salarie

        this.siteService.updateEmployee(this.employees, this.id_site, this.id_salarie)  // this.id_salarie
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    this.gotoSalariesPage();
                    this.successCreating = "Well done! You've updated this employee.";
                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public cancellErrorSalariesMessages() {
        this.errorSalaries = false;
    }

    public cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }
    private cancellErrorMessage() {
        this.loading = false;
        this.loadingGroupes = false;
        this.errorCreating = '';
        this.errorLoad = '';
    }


    gotoSalariesPage() {
        this.router.navigate(['/site', this.id_site, 'salaries']);
    }

    public datepickerViewInit() {
        //Datepicker Popups calender to Choose date
        $(() =>{
            $( '#birthDate, #datepicker2, #datepicker3, #datepicker4, #datepicker5' ).datepicker();
            $( '#birthDate, #datepicker2, #datepicker3, #datepicker4, #datepicker5' ).datepicker( 'option', 'changeYear', true );
            //Pass the user selected date format
            $( '#format' ).change(() => {
                $( '#birthDate, #datepicker2, #datepicker3, #datepicker4, #datepicker5' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }
    public tableMobileViewInit() {
        let headertext = [],
            headers = document.querySelectorAll('th'),
            tablerows = document.querySelectorAll('th'),
            tablebody = document.querySelector('tbody');
        if (document.querySelector('table')) {
            for(let i = 0; i < headers.length; i++) {
                let current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/,''));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute('data-th', headertext[j]);
                }
            }
        }
    }


}
