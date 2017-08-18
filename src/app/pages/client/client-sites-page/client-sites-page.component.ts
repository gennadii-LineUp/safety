import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {SiteClass} from '../../../models/const/site-class';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {TableSortService} from '../../../services/table-sort.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'app-client-sites-page',
  templateUrl: './client-sites-page.component.html',
  styleUrls: ['./client-sites-page.component.css'],
    providers: [ClientService, PaginationService, TableSortService, BackendService ]
})
export class ClientSitesPageComponent extends BasePageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = true;
    creating = false;
    errorLoad = '';
    errorSalaries = false;
    errorCreating = '';
    successCreating = '';

    loadingFile = false;
    uploadedFile = false;
    uploadFileText = 'Image du site';
    file: File;
    content: any;
    userHasChoosenFile = false;

    site: SiteClass[] = [];
    newSite_id: number;

    id_itemForDelete: number;

    _cacesSiege = false;
    _cacesSite = false;
    _medicalVisitSiege = false;
    _medicalVisitSite = false;
    _techControlSiege = false;
    _techControlSite = false;

    salariesMaxPossible: number;
    salariesUsed: number;

    sites = [];
    pager: any = {};
    totalItems =  0;
    activePage =  1;
    searchName = '';
    currentPage: any;

  newSite = new SiteClass('', '', '', '', '', false, false, false, false, false, false);

  headers: any[] = [
    { display: 'Nom du site',       variable: 'name',       filter: 'text' },
    { display: 'Adresse',           variable: 'address',    filter: 'text' },
    { display: 'Responsable site',  variable: 'responsible', filter: 'text' }
  ];
  sortingTarget = '';

    modalHeaders: any[] = [
        { display: 'Règle de notification', variable: 'name', filter: 'text' }
    ];


    constructor(public clientService: ClientService,
                public router: Router,
                public paginationService: PaginationService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public tableSortService: TableSortService,
                public backendService: BackendService) { super(); }

  ngOnInit() {
        this.findSiteByNameFunction('', 1, '');
        this.clientService.tableMobileViewInit();
        window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
        this.checkFreeSalarieAccount();
    }

    ngOnDestroy() {
        localStorage.removeItem('clientSiteSearch_page');
        localStorage.removeItem('clientSiteSearch_name');
        window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
    }

    public getSortingTarget() {
        this.sortingTarget = this.tableSortService._getSortingTarget();
    }


    public onInitChecking() {
        this.searchName = localStorage.clientSiteSearch_name;
        this.activePage = +localStorage.clientSiteSearch_page;
        if (this.searchName && this.activePage) {
            this.findSiteByNameFunction(this.searchName, this.activePage + 1, '');
        } else {
            this.findSiteByNameFunction('', 1, '');
        }
    }

    public checkFreeSalarieAccount() {
        this.doRequest(this.clientService, 'employeeCount', null, result => {
                    this.salariesMaxPossible = result.limitEmployees;
                    this.salariesUsed = result.employeeCount;
                    if (this.salariesMaxPossible === this.salariesUsed) {
                        this.errorSalaries = true;
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


    public findSiteByNameFunction(name: string, page: any = 1, sort: string) {
        this.cancellMessages();
        this.loading = true;
        this.emptyTable = false;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientSiteSearch_name;
        }
        this.activePage = page;
        this.doRequest(this.clientService, 'findSiteByName', [_name, page, sort], result => {
                    this.loading = false;
                    this.sites = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);
                    setTimeout(() => {
                        this.clientService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientSiteSearch_name', _name);
                    localStorage.setItem('clientSiteSearch_page', this.currentPage);
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public fileChange(event) {
      this.loadingFile = false;
      this.uploadedFile = false;

      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.userHasChoosenFile = true;
        this.file = fileList[0];
        this.uploadFileText = this.file.name;

        let reader = new FileReader();
        reader.onload = (e) => {
          this.content = e.target;
        };
        const res = reader.readAsDataURL(event.target.files[0]);
      }
    }

    public submitForm() {
        this.cancellMessages();
        this.creating = true;

        this.doRequest(this.clientService, 'addNewSite', [this.newSite], result => {
                    this.cancellMessages();
                    this.newSite_id = result.siteId;
                    if (this.userHasChoosenFile) {
                        this.loadingFile = true;
                      this.clientService.sendFileToServer(this.content, this.newSite_id)
                        .subscribe(result => {
                            this.loadingFile = false;
                            this.uploadedFile = true;
                            this.userHasChoosenFile = false;
                        }, (err) => {
                          this.loadingFile = false;
                          this.uploadFileText = '  error  error  error';
                          console.log(err);
                          this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
                        });
                    }
                  this.findSiteByNameFunction(this.searchName, this.activePage, '');
                  this.creating = false;
                  // modal close /////////
                  const _modal = document.getElementById('myModal').firstElementChild;
                  _modal.classList.add('hidden');
                  const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
                  (<HTMLScriptElement>modal_bg).classList.add('hidden');
                  /////////
                  this.newSite = new SiteClass('', '', '', '', '', false, false, false, false, false, false);
            }, (err) => {
                this.creating = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public modalOpen() {
      this.newSite = new SiteClass('', '', '', '', '', false, false, false, false, false, false);
      const _modal = document.getElementById('myModal').firstElementChild;
      if (_modal) {_modal.classList.remove('hidden'); }
      const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
      if (modal_bg) {(<HTMLScriptElement>modal_bg).classList.remove('hidden'); }
    }


  public setItemForDelete(id_itemForDelete: number) {
    this.id_itemForDelete = id_itemForDelete;
    return true;
  }
  public deleteFunction(id_itemForDelete: number) {
        this.cancellMessages();
        this.loading = true;
        this.emptyTable = false;

        this.doRequest(this.clientService, 'deleteSites', ['/' + this.id_itemForDelete], result => {
                    this.cancellMessages();
                    this.findSiteByNameFunction(this.searchName, this.activePage, '');
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public cacesSiegeClicked(e: any) {
        this._cacesSiege = e.target.checked;
    }
    public cacesSiteClicked(e: any) {
        this._cacesSite = e.target.checked;
    }
    public medicalVisitSiegeClicked(e: any) {
        this._medicalVisitSiege = e.target.checked;
    }
    public medicalVisitSiteClicked(e: any) {
        this._medicalVisitSite = e.target.checked;
    }
    public techControlSiegeClicked(e: any) {
        this._techControlSiege = e.target.checked;
    }
    public techControlSiteClicked(e: any) {
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
    public cancellErrorSalariesMessages() {
        this.errorSalaries = false;
    }

}
