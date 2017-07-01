import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {SiteClass} from '../../../models/const/site-class';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {TableSortService} from '../../../services/table-sort.service';

@Component({
  selector: 'app-client-sites-page',
  templateUrl: './client-sites-page.component.html',
  styleUrls: ['./client-sites-page.component.css'],
    providers: [ClientService, PaginationService, TableSortService]
})
export class ClientSitesPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = true;
    creating: boolean = false;
    errorLoad: string = '';
    errorSalaries: boolean = false;
    errorCreating: string = '';
    successCreating: string = '';

    loadingFile: boolean = false;
    uploadedFile: boolean = false;
    uploadFileText: string = 'Image du site';

    site: SiteClass[] = [];
    newSite_id: number;

    _cacesSiege: boolean = false;
    _cacesSite: boolean = false;
    _medicalVisitSiege: boolean = false;
    _medicalVisitSite: boolean = false;
    _techControlSiege: boolean = false;
    _techControlSite: boolean = false;

    salariesMaxPossible:number;
    salariesUsed:number;

    sites = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;


    modalHeaders: any[] = [
        { display: 'Règle de notification', variable: 'name', filter: 'text' }
    ];


    constructor(private clientService: ClientService,
                private router: Router,
                private paginationService: PaginationService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private tableSortService: TableSortService) {}

    ngOnInit() {
        this.findSiteByNameFunction('', 1, '');
        this.clientService.tableMobileViewInit();
        window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
    }

    ngOnDestroy() {
        localStorage.removeItem('clientSiteSearch_page');
        localStorage.removeItem('clientSiteSearch_name');
        window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
    }

    sortingTarget: string = '';
    headers: any[] = [
        { display: 'Nom du site',       variable: 'name',       filter: 'text' },
        { display: 'Adresse',           variable: 'address',    filter: 'text' }//,
        // { display: 'Responsable site',  variable: 'employees',  filter: 'text' }
    ];
    public getSortingTarget(){
        this.sortingTarget = this.tableSortService._getSortingTarget();
    }


    public onInitChecking() {
        this.searchName = localStorage.clientSiteSearch_name;
        this.activePage = +localStorage.clientSiteSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findSiteByNameFunction(this.searchName, this.activePage + 1, '');
        } else {
            this.findSiteByNameFunction('',1, '');
        }
        console.log('====' + this.searchName);
    }

    public checkFreeSalarieAccount() {
        this.clientService.employeeCount()
            .subscribe(result => {
                if (result) {
                    this.salariesMaxPossible = result.limitEmployees;
                    this.salariesUsed = result.employeeCount;
                    if (this.salariesMaxPossible === this.salariesUsed) {
                        this.errorSalaries = true;
                    }
                }
            }, (err) => {
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findSiteByNameFunction(name:string, page:any = 1, sort: string) {
        this.cancellMessages();
        this.loading = true;
        this.emptyTable = false;

        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientSiteSearch_name;
        }

        this.clientService.findSiteByName(_name, page, sort)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log(result);
                    this.sites = result.items;  // EXAMPLE:  [{ address:"ff", id:23, name:"ds"} ]
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    setTimeout(() => {
                        this.clientService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientSiteSearch_name', _name);
                    localStorage.setItem('clientSiteSearch_page', this.currentPage);
                }
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log('====error=============');
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    file: File;
    userHasChoosenFile: boolean = false;
    public fileChange(event) {
        this.loadingFile = false;
        this.uploadedFile = false;
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.userHasChoosenFile = true;
            this.file = fileList[0];
            this.uploadFileText = this.file.name;
        }
    }

    public submitForm(name: string, address: string, postalCode: string, city: string, notificationEmails: string,
                      cacesSiege: boolean,
                      cacesSite: boolean,
                      medicalVisitSiege: boolean,
                      medicalVisitSite: boolean,
                      techControlSiege: boolean,
                      techControlSite: boolean) {

        this.cancellMessages();
        this.creating = true;

        let newSite = new SiteClass(name, address, postalCode, city, notificationEmails,
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
                    this.cancellMessages();
                    console.log(result);
                    this.newSite_id = result.siteId;
                    if (this.userHasChoosenFile) {
                        this.loadingFile = true;
                        this.clientService.uploadImage(this.file, this.newSite_id)
                            .subscribe(result => {
                                if (result) {
                                    this.loadingFile = false;
                                    this.uploadedFile = true;
                                    console.log(result);
                                    this.successCreating = "Well done! You've created a new client.";
                                }
                            }, (err) => {
                                this.loadingFile = false;
                                this.uploadFileText = '  error  error  error';
                                console.log(err);

                                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
                            });
                    }
                    else {
                        this.successCreating = "Well done! You've created a new client.";
                    }
                    this.creating = false;
                    this.userHasChoosenFile = false;
                    this.ngOnInit();
                }
            }, (err) => {
                this.creating = false;
                console.log(err);

                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public deleteFunction(id_itemForDelete: number) {
        this.loading = true;
        this.emptyTable = false;

        this.clientService.deleteSites('/' + id_itemForDelete)
            .subscribe(result => {
                if (result) {
                    this.cancellMessages();
                    console.log(result);
                    this.ngOnInit();
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
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

    public cancellMessages() {
        this.loading = false;
        this.creating = false;
        this.errorLoad = '';
        this.errorSalaries = false;
        this.errorCreating = '';
        this.successCreating = '';
    }

}
