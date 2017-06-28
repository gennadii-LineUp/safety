import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';
import {SiteService} from '../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {EmployeesClass} from '../../../models/const/employees-class';
import {TableSortService} from '../../../services/table-sort.service';

@Component({
  selector: 'site-salaries-page',
  templateUrl: './site-salaries-page.component.html',
  styleUrls: ['./site-salaries-page.component.css'],
    providers: [SiteService, PaginationService, TableSortService]
})
export class SiteSalariesPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = false;
    loaded: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';
    
    id_site: number;
    site: EmployeesClass[] = [];

    salaries = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;

    headers: any[] = [
        { display: 'Nom',     variable: 'name',           filter: 'text' },
        { display: 'Prénom',  variable: 'surname',        filter: 'text' },
        { display: 'N° sécu', variable: 'numSecu',        filter: 'text' },
        { display: 'Groupe',  variable: 'groupName',  filter: 'number' },
        { display: 'Accès',   variable: 'access',          filter: 'text' },
        { display: 'Validité',variable: 'validityPeriod', filter: 'text' }
    ];


    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private paginationService: PaginationService,
                private router: Router,
                private tableSortService: TableSortService) { }

    ngOnInit() {
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
        this.findEmployeeByNameFunction('');

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
            this.findEmployeeByNameFunction(this.searchName, this.activePage + 1);
        } else {
            this.findEmployeeByNameFunction('');
        }
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findEmployeeByNameFunction(name:string, page:any = 1) {
        this.loading = true;
        this.emptyTable = false;

        this.cancellErrorMessage();

        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.siteEmployeeSearch_name;
        }

        this.siteService.findEmployeeByName(_name, page, this.id_site)
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
                        this.siteService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('siteEmployeeSearch_name', _name);
                    localStorage.setItem('siteEmployeeSearch_page', this.currentPage);
                }
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    private cancellErrorMessage() {
        //this.loading = false;
        this.errorLoad = '';
        this.errorSalaries = '';
        this.errorCreating = '';
    }

    gotoNewSalariesForm() {
        this.router.navigate(['/site', this.id_site, 'ajouter-un-salarie-etap1']);
    }


}
