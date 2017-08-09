import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {SiteService} from '../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {EmployeesClass} from '../../../models/const/employees-class';
import {TableSortService} from '../../../services/table-sort.service';
import {ClientService} from '../../../services/client/client.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'site-salaries-page',
  templateUrl: './site-salaries-page.component.html',
  styleUrls: ['./site-salaries-page.component.css'],
    providers: [ClientService, SiteService, PaginationService, TableSortService, BackendService ]
})
export class SiteSalariesPageComponent extends BasePageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = false;
    loaded = false;
    errorLoad = '';
    errorCreating = '';
    successCreating = '';

    addNewSalariesAvailable = true;
    errorSalaries = false;
    salariesMaxPossible: number;
    salariesUsed: number;

    id_site: number;
    site: EmployeesClass[] = [];

    salaries = [];
    pager: any = {};
    totalItems =  0;
    activePage =  1;
    searchName = '';
    currentPage: any;

    headers: any[] = [
        { display: 'Nom',     variable: 'name',           filter: 'text' },
        { display: 'Prénom',  variable: 'surname',        filter: 'text' },
        { display: 'N° sécu', variable: 'numSecu',        filter: 'text' },
        { display: 'Groupe',  variable: 'groupName',      filter: 'number' },
        { display: 'Accès',   variable: 'access',         filter: 'text' },
        { display: 'Validité', variable: 'validityPeriod', filter: 'text' }
    ];
    sortingTarget = '';
    public getSortingTarget() {
      this.sortingTarget = this.tableSortService._getSortingTarget();
    }


  constructor(public clientService: ClientService,
              public siteService: SiteService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public paginationService: PaginationService,
              public router: Router,
              public tableSortService: TableSortService,
              public backendService: BackendService) { super(); }

  ngOnInit() {
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
        this.checkFreeSalarieAccount();
        this.findEmployeeByNameFunction('', 1, '');

        this.siteService.tableMobileViewInit();
    }

    ngOnDestroy() {
        localStorage.removeItem('siteEmployeeSearch_page');
        localStorage.removeItem('siteEmployeeSearch_name');
    }


    public onInitChecking() {
        this.searchName = localStorage.siteEmployeeSearch_name;
        this.activePage = +localStorage.siteEmployeeSearch_page;

        if (this.searchName && this.activePage) {
            this.findEmployeeByNameFunction(this.searchName, this.activePage + 1, '');
        } else {
            this.findEmployeeByNameFunction('', 1, '');
        }
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findEmployeeByNameFunction(name: string, page: any = 1, sort: string) {
        this.loading = true;
        this.emptyTable = false;

        this.cancellErrorMessage();

        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.siteEmployeeSearch_name;
        }
        this.activePage = page;

        this.doRequest(this.siteService, 'findEmployeeByName', [_name, page, this.id_site, sort], result => {
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
                        this.siteService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('siteEmployeeSearch_name', _name);
                    localStorage.setItem('siteEmployeeSearch_page', this.currentPage);
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public checkFreeSalarieAccount() {
        this.doRequest(this.clientService, 'employeeCount', null, result => {
                    this.salariesMaxPossible = result.limitEmployees;
                    this.salariesUsed = result.employeeCount;
                    if (this.salariesMaxPossible === this.salariesUsed) {
                        this.addNewSalariesAvailable = false;
                        this.errorSalaries = true;
                        console.log(this.salariesMaxPossible + ' ' + this.salariesUsed);
                    } else {
                        this.addNewSalariesAvailable = true;
                    }
            }, (err) => {
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public deleteFunction(id_itemForDelete: number) {
        this.cancellErrorSalariesMessages();
        this.cancellErrorMessage();
        this.loading = true;
        this.emptyTable = false;

        this.doRequest(this.siteService, 'deleteEmployee', [this.id_site, id_itemForDelete], result => {
                    this.loading = false;
                    console.log(result);
                    this.checkFreeSalarieAccount();
                    this.findEmployeeByNameFunction(this.searchName, this.activePage, '');
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    modifierSalarieFunction(id_salarie:number) {
        localStorage.setItem('id_salarie', ''+id_salarie);
        this.router.navigate(['/site', this.id_site, 'ajouter-un-salarie-etap2']);
    }

  public cancellErrorMessage() {
        //this.loading = false;
        this.errorLoad = '';
        this.errorCreating = '';
    }
    public cancellErrorSalariesMessages() {
        this.errorSalaries = false;
    }


    gotoNewSalariesForm() {
        this.router.navigate(['/site', this.id_site, 'ajouter-un-salarie-etap1']);
    }


}
