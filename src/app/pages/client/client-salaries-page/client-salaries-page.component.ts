import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../services/client/client.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'client-salaries-page',
  templateUrl: './client-salaries-page.component.html',
  styleUrls: ['./client-salaries-page.component.css'],
    providers: [ClientService, AdminService, PaginationService, ErrorMessageHandlerService]
})
export class ClientSalariesPageComponent implements OnInit {
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    salariesMaxPossible:number = 1;
    salariesUsed:number = 1;

    salaries = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;


    constructor(private clientService: ClientService,
                private adminService: AdminService,
                private router: Router,
                private paginationService: PaginationService,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
        this.findSalarieByNameFunction('');
        this.tableMobileViewInit();
        this.getUsedSalaries();
    }


    ngOnDestroy() {
        localStorage.removeItem('clientSalarieSearch_page');
        localStorage.removeItem('clientSalarieSearch_name');
    }

    public getUsedSalaries() {
        this.loadingSalarieUsed = true;
        this.loadedSalarieUsed = false;
        this.adminService.findClientByName('', 1)
            .subscribe(result => {
                if (result) {
                    this.loadingSalarieUsed = false;
                    this.loadedSalarieUsed = true;

                    console.log(result);
                    this.salariesMaxPossible = result;
                }
            }, (err) => {
                this.loadingSalarieUsed = false;
                console.log('====error=============');
                console.log(err);
                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }

                this.errorLoad = err;
            });
    }

    public onInitChecking() {
        this.searchName = localStorage.clientSalarieSearch_name;
        this.activePage = +localStorage.clientSalarieSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findSalarieByNameFunction(this.searchName, this.activePage + 1);
        } else {
            this.findSalarieByNameFunction('');
        }
        console.log('====' + this.searchName);
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findSalarieByNameFunction(name:string, page:any = 1) {
        this.loading = true;
        this.cancellErrorMessage();

        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientSalarieSearch_name;
        }

        this.clientService.findSalarieByName(_name, page)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log(result);
                    this.salaries = result.items;  // EXAMPLE: [{ id:107, name:"d", surname:"ds", numSecu:"ds", siteName:"Site 3", groupName:"56", validityPeriod: false, expiresDate:null} ]
                    this.totalItems = +result.pagination.totalCount;
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientSalarieSearch_name', _name);
                    localStorage.setItem('clientSalarieSearch_page', this.currentPage);
                }
            }, (err) => {
                this.loading = false;
                console.log('====error=============');
                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }

                this.errorLoad = err;
                console.log(err);
            });
    }

    private cancellErrorMessage() {
        //this.loading = false;
        this.errorLoad = '';
        this.errorSalaries = '';
        this.errorCreating = '';
    }
    public cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }

    public tableMobileViewInit() {
        let headertext = [],
            headers = document.querySelectorAll("th"),
            tablerows = document.querySelectorAll("th"),
            tablebody = document.querySelector("tbody");
        if (document.querySelector("table")) {
            for(let i = 0; i < headers.length; i++) {
                let current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/,""));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute("data-th", headertext[j]);
                }
            }
        }
    }

}
