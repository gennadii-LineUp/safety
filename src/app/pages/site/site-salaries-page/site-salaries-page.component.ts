import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';
import {SiteService} from '../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {EmployeesClass} from '../../../models/const/employees-class';

@Component({
  selector: 'site-salaries-page',
  templateUrl: './site-salaries-page.component.html',
  styleUrls: ['./site-salaries-page.component.css'],
    providers: [SiteService, ErrorMessageHandlerService, PaginationService]
})
export class SiteSalariesPageComponent implements OnInit {
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


    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private paginationService: PaginationService,
                private router: Router) { }

    ngOnInit() {
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
        this.findEmployeeByNameFunction('');

        this.tableMobileViewInit();
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
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('siteEmployeeSearch_name', _name);
                    localStorage.setItem('siteEmployeeSearch_page', this.currentPage);
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
