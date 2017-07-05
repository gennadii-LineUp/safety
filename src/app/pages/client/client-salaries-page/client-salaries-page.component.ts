import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../services/client/client.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {TableSortService} from '../../../services/table-sort.service';

@Component({
  selector: 'client-salaries-page',
  templateUrl: './client-salaries-page.component.html',
  styleUrls: ['./client-salaries-page.component.css'],
    providers: [ClientService, AdminService, PaginationService, TableSortService]
})
export class ClientSalariesPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    salariesMaxPossible:number;
    salariesUsed:number;

    salaries = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;

    headers: any[] = [
        { display: 'Nom',       variable: 'name',           filter: 'text' },
        { display: 'Prénom',    variable: 'surname',        filter: 'text' },
        { display: 'n° Sécu',   variable: 'numSecu',        filter: 'text' },
        { display: 'Site',      variable: 'siteName',       filter: 'text' },
        { display: 'Groupe',    variable: 'groupName',      filter: 'text' },
        { display: 'Validité',  variable: 'validityPeriod', filter: 'text' },
    ];
    sortingTarget: string = '';
    public getSortingTarget(){
        this.sortingTarget = this.tableSortService._getSortingTarget();
    }


    constructor(private clientService: ClientService,
                private adminService: AdminService,
                private router: Router,
                private paginationService: PaginationService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private tableSortService: TableSortService) {}

    ngOnInit() {
        this.findSalarieByNameFunction('', 1, '');
        this.clientService.tableMobileViewInit();
        this.getUsedSalaries();
    }


    ngOnDestroy() {
        localStorage.removeItem('clientSalarieSearch_page');
        localStorage.removeItem('clientSalarieSearch_name');
    }

    public getUsedSalaries() {
        this.loadingSalarieUsed = true;
        this.loadedSalarieUsed = false;
        this.clientService.employeeCount()
            .subscribe(result => {
                if (result) {
                    this.loadingSalarieUsed = false;
                    this.loadedSalarieUsed = true;

                    console.log(result);
                    this.salariesMaxPossible = result.limitEmployees;
                    this.salariesUsed = result.employeeCount;
                }
            }, (err) => {
                this.loadingSalarieUsed = false;
                if ((err.status === 403) || (err.status === 500)) {
                    // this.errorLoad = "Aucun salarié n'a pas été créé";
                    return;
                }

                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public onInitChecking() {
        this.searchName = localStorage.clientSalarieSearch_name;
        this.activePage = +localStorage.clientSalarieSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findSalarieByNameFunction(this.searchName, this.activePage + 1, '');
        } else {
            this.findSalarieByNameFunction('', 1, '');
        }
    }

    public deleteFunction(siteId: number, employeeId: number) {
        this.loading = true;
        this.emptyTable = false;

        this.clientService.deleteEmployee(siteId, employeeId)
            .subscribe(result => {
                if (result) {
                    this.cancellErrorMessage();
                    console.log(result);
                    this.ngOnInit();
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findSalarieByNameFunction(name:string, page:any = 1, sort: string) {
        this.loading = true;
        this.emptyTable = false;
        this.cancellErrorMessage();

        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientSalarieSearch_name;
        }

        this.clientService.findSalarieByName(_name, page, sort)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log(result);
                    this.salaries = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.clientService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientSalarieSearch_name', _name);
                    localStorage.setItem('clientSalarieSearch_page', this.currentPage);
                }
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log(err);
                if (err.status === 403) {
                    //this.errorLoad = "Aucun salarié n'a pas été créé";
                    return;
                }

                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public modifierSalarieFunction(id_site:number, id_salarie:number) {
        localStorage.setItem('id_site', ''+id_site);
        localStorage.setItem('id_salarie', ''+id_salarie);
        this.router.navigate(['/site', id_site, 'ajouter-un-salarie-etap2']);
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

}
