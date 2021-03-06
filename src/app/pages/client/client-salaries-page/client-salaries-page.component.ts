import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../../services/client/client.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {TableSortService} from '../../../services/table-sort.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'client-salaries-page',
  templateUrl: './client-salaries-page.component.html',
  styleUrls: ['./client-salaries-page.component.css'],
    providers: [ClientService, AdminService, PaginationService, TableSortService, BackendService ]
})
export class ClientSalariesPageComponent extends BasePageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = false;
    loadingSalarieUsed = false;
    loaded = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    salariesMaxPossible =  1;
    salariesUsed =  0;

    id_itemForDelete: number;
    siteId: number;

    salaries = [];
    pager: any = {};
    totalItems =  0;
    activePage =  1;
    searchName = '';
    currentPage: any;

    headers: any[] = [
        { display: 'Nom',       variable: 'name',           filter: 'text' },
        { display: 'Prénom',    variable: 'surname',        filter: 'text' },
        { display: 'n° Sécu',   variable: 'numSecu',        filter: 'text' },
        { display: 'Site',      variable: 'siteName',       filter: 'text' },
        { display: 'Groupe',    variable: 'groupName',      filter: 'text' },
        { display: 'Validité',  variable: 'validityPeriod', filter: 'text' },
    ];
    sortingTarget = '';
    public getSortingTarget() {
        this.sortingTarget = this.tableSortService._getSortingTarget();
    }


    constructor(public clientService: ClientService,
                public adminService: AdminService,
                public router: Router,
                public paginationService: PaginationService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public tableSortService: TableSortService,
                public backendService: BackendService) { super(); }

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
        this.doRequest(this.clientService, 'employeeCount', null, result => {
                    this.loadingSalarieUsed = false;
                    this.salariesMaxPossible = result.limitEmployees;
                    this.salariesUsed = result.employeeCount;
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
            this.findSalarieByNameFunction(this.searchName, this.activePage + 1, '');
        } else {
            this.findSalarieByNameFunction('', 1, '');
        }
    }

  public setItemForDelete(siteId: number, id_itemForDelete: number) {
    this.siteId = siteId;
    this.id_itemForDelete = id_itemForDelete;
    return true;
  }
  public deleteFunction() {
        this.loading = true;
        this.emptyTable = false;

        this.doRequest(this.clientService, 'deleteEmployee', [this.siteId, this.id_itemForDelete], result => {
                    this.cancellErrorMessage();
                    this.findSalarieByNameFunction(this.searchName, this.activePage, '');
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


    public findSalarieByNameFunction(name: string, page: any = 1, sort: string) {
        this.loading = true;
        this.emptyTable = false;
        this.cancellErrorMessage();

        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientSalarieSearch_name;
        }
        this.activePage = page;

        this.doRequest(this.clientService, 'findSalarieByName', [_name, page, sort], result => {
                    this.loading = false;
                    this.salaries = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);
                    this.loaded = true;
                    setTimeout(() => {
                        this.clientService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientSalarieSearch_name', _name);
                    localStorage.setItem('clientSalarieSearch_page', this.currentPage);
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log(err);
                if (err.status === 403) {
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

  public cancellErrorMessage() {
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
