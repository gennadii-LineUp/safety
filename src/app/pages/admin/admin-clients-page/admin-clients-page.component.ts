import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {TableSortService} from '../../../services/table-sort.service';


@Component({
  selector: 'app-admin-clients-page',
  templateUrl: './admin-clients-page.component.html',
  styleUrls: ['./admin-clients-page.component.css'],
    providers: [AdminService, PaginationService, TableSortService]
})
export class AdminClientsPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = true;
    loaded: boolean = false;
    updating: boolean = false;
    errorLoad: string = '';
    successUpdate: string = '';
    errorUpdate: string = '';

    clients = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;

    headers: any[] = [
        { display: 'Entreprise', variable: 'name',       filter: 'text'  },
        { display: 'Sites',      variable: 'sites',      filter: 'text' },
        { display: 'Employés',   variable: 'employees',  filter: 'text' },
    ];
    // "company": "as",     REPLACE !!!!!!!!!!
    // "sites": "0",
    // "employees": "0/2"


    constructor(private adminService: AdminService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private paginationService: PaginationService,
                private router: Router,
                private tableSortService: TableSortService) { }



    ngOnInit() {
        this.findClientByNameFunction('');
    }

    ngOnDestroy() {
        localStorage.removeItem('adminClientsSearch_page');
        localStorage.removeItem('adminClientsSearch_name');
    }


    // selectedClass(columnName): string{
    //     return columnName == this.sorting.column ? 'sort-button-' + this.sorting.descending : 'double-sort-button';
    // }        //    access = (age > 14) ? true : false;
    //
    // changeSorting(columnName): void{
    //     console.log(columnName);
    //     var sort = this.sorting;
    //     if (sort.column == columnName) {
    //         sort.descending = !sort.descending;
    //     } else {
    //         sort.column = columnName;
    //         sort.descending = false;
    //     }
    // }

    public onInitChecking() {
        this.searchName = localStorage.adminClientsSearch_name;
        this.activePage = +localStorage.adminClientsSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findClientByNameFunction(this.searchName, this.activePage + 1);
        } else {
            this.findClientByNameFunction('');
        }
        console.log('====' + this.searchName);
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findClientByNameFunction(name:string, page:any = 1) {
        this.loading = true;
        this.emptyTable = false;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.adminClientsSearch_name;
        }

        this.adminService.findClientByName(_name, page)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log(result);
                    this.clients = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.adminService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('adminClientsSearch_name', _name);
                }
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    gotoClientMenu(client_id: string) {
        this.loading = true;
        this.adminService.getTolkinAdminAsClient(+client_id)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);

                    localStorage.setItem('previous_tokenAdmin', localStorage.token);
                    localStorage.setItem('previous_roleAdmin', localStorage.role);

                    setTimeout(() => {
                        localStorage.setItem('token', result.token);
                        localStorage.setItem('role', result.roles[0]);
                    }, 100);

                    console.log(localStorage);

                    setTimeout(() => {
                        this.router.navigate(['/client']);
                    }, 300);
                    console.log('=====');
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    gotoNewClientForm() {
        this.router.navigate(['/admin/client/ajouter-un-client']);
    }


    private cancellErrorMessage() {
        this.loading = false;
        //this.updating = true;
        // this.errorUpdate = '';
        this.errorLoad = '';
    }


}
