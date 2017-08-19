import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableSortService} from '../../../services/table-sort.service';
import {AdminService} from '../../../services/admin/admin.service';
import {AdminBibliothequeClass} from '../../../models/const/admin-biblioth-class';
import {Router} from '@angular/router';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {BasePageComponent} from '../../base/base-page.component';
import {BackendService} from '../../../services/backend/backend.service';

@Component({
  selector: 'app-admin-bibliotheque-page',
  templateUrl: './admin-bibliotheque-page.component.html',
  styleUrls: ['./admin-bibliotheque-page.component.css'],
    providers: [ AdminService, PaginationService, TableSortService, BackendService ]
})
export class AdminBibliothequePageComponent extends BasePageComponent implements OnInit, OnDestroy {
    loading = true;
    creating = false;
    errorLoad = '';
    errorCreating = '';
    successCreating = '';

    id_itemForDelete: number;
    links = [];
    pager: any = {};
    totalItems =  0;
    activePage =  1;
    searchName = '';
    currentPage: any;

    emptyTable = true;

    itemForChange =  0;
    saveButtonCaption = 'Créer';

    sortingTarget = '';
    sorting: any = { column: 'name',  descending: false };
    headers: any[] = [
        { display: 'Nom',  variable: 'name',  filter: 'text' },
        { display: 'Lien', variable: 'link',  filter: 'text' }
    ];

    adminBibliotheque = new AdminBibliothequeClass('', '', 'http://www.');

    constructor(public adminService: AdminService,
                public paginationService: PaginationService,
                public tableSortService: TableSortService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public router: Router,
                public backendService: BackendService) { super(); }

    ngOnInit() {
        this.loading = true;
        this.findLinkByNameFunction('', 1, '');
    }

    ngOnDestroy() {
        localStorage.removeItem('adminLinkSearch_page');
        localStorage.removeItem('adminLinkSearch_name');
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

        this.sortingTarget = '&sort=' + sortingDirection + columnName;
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findLinkByNameFunction(name: string, page: any = 1, sort) {
        this.loading = true;
        this.emptyTable = false;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.adminLinkSearch_name;
        }

        this.doRequest(this.adminService, 'findLinksByName', [_name, page, sort], result => {
                    this.cancellMessages();
                    this.links = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    this.currentPage = +result.pagination.current;
                    this.setPage(this.currentPage);

                    setTimeout(() => {
                        this.adminService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('adminLinkSearch_name', _name);
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public getItemForUpdateFunction(id_itemForUpdate: number) {
        this.adminBibliotheque = new AdminBibliothequeClass('', '', 'http://www.');
        this.modalOpen();
        this.cancellMessages();
        this.creating = true;

        this.doRequest(this.adminService, 'getLinkForUpdate', ['/' + id_itemForUpdate], result => {
                    this.creating = false;
                    this.adminBibliotheque.name = result.name;
                    this.adminBibliotheque.description = result.description;
                    this.adminBibliotheque.link = result.link;
                    this.itemForChange = result.id;
                    this.saveButtonCaption = 'Modifier';
            }, (err) => {
                this.creating = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public submitForm(name: string, description: string, link: string) {
        let urlOption = '';
        if (this.itemForChange) {
            urlOption = '/' + this.itemForChange;
            this.saveButtonCaption = 'Modifier';
        }

        this.cancellMessages();
        this.creating = true;

        this.doRequest(this.adminService, 'saveLink', [this.adminBibliotheque, urlOption], result => {
                    this.creating = false;
                    if (this.itemForChange) {
                        this.saveButtonCaption = 'Créer';
                        this.itemForChange = 0;
                    }
                    this.findLinkByNameFunction('', 1, '');
                    // modal close /////////
                    const _modal = document.getElementById('myModal').firstElementChild;
                    _modal.classList.add('hidden');
                    const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
                    (<HTMLScriptElement>modal_bg).classList.add('hidden');
                    /////////
                    this.adminBibliotheque = new AdminBibliothequeClass('', '', 'http://www.');
        }, (err) => {
                this.creating = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

  public modalOpen() {
    const _modal = document.getElementById('myModal').firstElementChild;
    if (_modal) {_modal.classList.remove('hidden'); }
    const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
    if (modal_bg) {(<HTMLScriptElement>modal_bg).classList.remove('hidden'); }
  }

  public setItemForDelete(id_itemForDelete: number) {
    this.id_itemForDelete = id_itemForDelete;
    return true;
  }
  public deleteFunction() {
        this.loading = true;
        this.emptyTable = false;
        this.doRequest(this.adminService, 'deleteLink', ['/' + this.id_itemForDelete], result => {
                    this.cancellMessages();
                    this.ngOnInit();
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public openLinkInNewWindowFunction(link) {
        window.open(link, '_blank');
    }

    public cancellMessages() {
        this.loading = false;
        this.creating = false;
        this.errorLoad = '';
        this.errorCreating = '';
        this.successCreating = '';
    }

}
