import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {SiteClass} from '../../../models/const/site-class';
import {PaginationService} from '../../../services/pagination/pagination.service';

@Component({
  selector: 'app-client-sites-page',
  templateUrl: './client-sites-page.component.html',
  styleUrls: ['./client-sites-page.component.css'],
    providers: [ClientService, PaginationService, ErrorMessageHandlerService]
})
export class ClientSitesPageComponent implements OnInit {
    loading: boolean = false;
    loaded: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    site: SiteClass[] = [];

    _cacesSiege: boolean = false;
    _cacesSite: boolean = false;
    _medicalVisitSiege: boolean = false;
    _medicalVisitSite: boolean = false;
    _techControlSiege: boolean = false;
    _techControlSite: boolean = false;


    sites = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;


    constructor(private clientService: ClientService,
                private router: Router,
                private paginationService: PaginationService,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
        this.findSiteByNameFunction('');
        this.tableMobileViewInit();
    }


    ngOnDestroy() {
        localStorage.removeItem('clientSiteSearch_page');
        localStorage.removeItem('clientSiteSearch_name');
    }


    public onInitChecking() {
        this.searchName = localStorage.clientSiteSearch_name;
        this.activePage = +localStorage.clientSiteSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findSiteByNameFunction(this.searchName, this.activePage + 1);
        } else {
            this.findSiteByNameFunction('');
        }
        console.log('====' + this.searchName);
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findSiteByNameFunction(name:string, page:any = 1) {
        this.loading = true;
        this.cancellErrorMessage();

        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientSiteSearch_name;
        }

        this.clientService.findSiteByName(_name, page)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log(result);
                    this.sites = result.items;  // EXAMPLE:  [{ address:"ff", id:23, name:"ds"} ]
                    this.totalItems = +result.pagination.totalCount;
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientSiteSearch_name', _name);
                    localStorage.setItem('clientSiteSearch_page', this.currentPage);
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


    public submitForm(name: string, address: string, postalCode: string, city: string, notificationEmails: string,
                      cacesSiege: boolean,
                      cacesSite: boolean,
                      medicalVisitSiege: boolean,
                      medicalVisitSite: boolean,
                      techControlSiege: boolean,
                      techControlSite: boolean) {

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let newSite = new SiteClass(name,
            address,
            postalCode,
            city,
            notificationEmails,
            this._cacesSiege,
            this._cacesSite,
            this._medicalVisitSiege,
            this._medicalVisitSite,
            this._techControlSiege,
            this._techControlSite);

        console.dir(newSite);

        this.clientService.addNewSite(newSite)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    this.cancellErrorMessage();
                    console.log('======result====OK======');
                    console.log(result);
                    this.successCreating = "Well done! You've created a new client.";

                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                console.log(err);

                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorCreating = errorStatusKnown;
                    return;
                }

                let error = (JSON.parse(err._body)).errors;

                if (Object.keys(error).length > 0) {
                    this.errorCreating = this.errorMessageHandlerService.errorHandler(error);
                }
            });
    }


    public cacesSiegeClicked(e:any) {
        this._cacesSiege = e.target.checked;
    }
    public cacesSiteClicked(e:any) {
        this._cacesSite = e.target.checked;
    }
    public medicalVisitSiegeClicked(e:any) {
        this._medicalVisitSiege = e.target.checked;
    }
    public medicalVisitSiteClicked(e:any) {
        this._medicalVisitSite = e.target.checked;
    }
    public techControlSiegeClicked(e:any) {
        this._techControlSiege = e.target.checked;
    }
    public techControlSiteClicked(e:any) {
        this._techControlSite = e.target.checked;
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
    public cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }

    public gotoClientHomeForm() {
        this.loading = true;
        this.ngOnInit();
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/client/accueil']);

    }

}
