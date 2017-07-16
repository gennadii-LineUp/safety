import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class AdminClientsPageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = true;
    loaded = false;
    updating = false;
    errorLoad = '';
    successUpdate = '';
    errorUpdate = '';
    successCreating = '';

    clients = [];
    pager: any = {};
    totalItems =  0;
    activePage =  1;
    searchName = '';
    currentPage: any;
    sortingTarget = '';


    sorting: any = { column: 'company',  descending: false };
    headers: any[] = [
        { display: 'Entreprise', variable: 'company',    filter: 'text'  },
        { display: 'Sites',      variable: 'sites',      filter: 'text' },
        { display: 'Employés',   variable: 'employees',  filter: 'text' },
    ];


    constructor(private adminService: AdminService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private paginationService: PaginationService,
                private router: Router,
                private tableSortService: TableSortService) { }

    ngOnInit() {
        if (localStorage.successCreating) {
          console.log('YES!!!');
          this.successCreating = localStorage.successCreating;
        }
        this.findClientByNameFunction('', 1, '');
    }

    ngOnDestroy() {
        localStorage.removeItem('adminClientsSearch_page');
        localStorage.removeItem('adminClientsSearch_name');
        localStorage.removeItem('successCreating');
    }


    public selectedClass(columnName): string {
        return columnName === this.sorting.column ? 'sort-button-' + this.sorting.descending : 'double-sort-button';
    }
    public changeSorting(columnName: string, e: any): void {
        let sortingDirection: string;
        let thClass: string;

        const sort = this.sorting;
        if (sort.column === columnName) {
            sort.descending = !sort.descending;
        } else {
            sort.column = columnName;
            sort.descending = false;
        }

        if (e.target.firstElementChild) {
            thClass = e.target.firstElementChild.className;
        } else {
            thClass = e.target.className;
        }
        if ((thClass === 'double-sort-button') || (thClass === 'sort-button-true')) {
            sortingDirection = '';  // down
        }
        if (thClass === 'sort-button-false') {
            sortingDirection = '-'; // up
        }

       // let input_findClientByName = window.document.getElementsByClassName('search-input')['0'].value;
        this.sortingTarget = '&sort=' + sortingDirection + columnName;
    }


    public onInitChecking() {
        this.searchName = localStorage.adminClientsSearch_name;
        this.activePage = +localStorage.adminClientsSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findClientByNameFunction(this.searchName, this.activePage + 1, '');
        } else {
            this.findClientByNameFunction('', 1, '');
        }
        console.log('====' + this.searchName);
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findClientByNameFunction(name: string, page: number, sort) {
        this.loading = true;
        this.emptyTable = false;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.adminClientsSearch_name;
        }
        this.activePage = page;
        localStorage.setItem('adminClientsSearch_page', '' + page);

        this.adminService.findClientByName(_name, page, sort)
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

    public deleteFunction(id_itemForDelete: number) {
        this.loading = true;
        this.emptyTable = false;

        this.adminService.deleteClient('/' + id_itemForDelete)
            .subscribe(result => {
                if (result) {
                    this.cancellErrorMessage();
                    console.log(result);
                    // this.ngOnInit();
                    this.findClientByNameFunction(this.searchName, this.activePage, '');
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
        this.errorLoad = '';
      this.successCreating = '';
    }


}
