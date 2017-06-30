import { Component, OnInit } from '@angular/core';
import {TableSortService} from '../../../services/table-sort.service';
import {AdminService} from '../../../services/admin/admin.service';
import {AdminBibliothequeClass} from '../../../models/const/admin-biblioth-class';
import {Router} from '@angular/router';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';

@Component({
  selector: 'app-admin-bibliotheque-page',
  templateUrl: './admin-bibliotheque-page.component.html',
  styleUrls: ['./admin-bibliotheque-page.component.css'],
    providers: [ AdminService, PaginationService, TableSortService]
})
export class AdminBibliothequePageComponent implements OnInit {
    loading: boolean = true;
    creating: boolean = false;
    errorLoad: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    links = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;
    sortingTarget: string = '';

    emptyTable: boolean = true;

    itemForChange: number = 0;
    saveButtonCaption: string = 'Créer';

    sorting: any = { column: 'name',  descending: false };
    headers: any[] = [
        { display: 'Nom',  variable: 'name',  filter: 'text' },
        { display: 'Lien', variable: 'link',  filter: 'text' }
    ];

    adminBibliotheque = new AdminBibliothequeClass('','','http://www.');

    //  AdminBibliothequeClass
    // name: string;
    // description: string;
    // link: string;


    constructor(private adminService: AdminService,
                private paginationService: PaginationService,
                private tableSortService: TableSortService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.findLinkByNameFunction('', 1, '');
        this.adminService.tableMobileViewInit();
    }

    ngOnDestroy() {
        localStorage.removeItem('adminLinkSearch_page');
        localStorage.removeItem('adminLinkSearch_name');
    }


    public selectedClass(columnName): string{
        return columnName == this.sorting.column ? 'sort-button-' + this.sorting.descending : 'double-sort-button';
    }
    public changeSorting(columnName:string, e:any): void{
        let sortingDirection: string;
        let thClass: string;

        var sort = this.sorting;
        if (sort.column == columnName) {
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

        let input_findClientByName = window.document.getElementsByClassName('search-input')['0'].value;
        this.sortingTarget = '&sort=' + sortingDirection + columnName;
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findLinkByNameFunction(name:string, page:any = 1, sort) {
        this.loading = true;
        this.emptyTable = false;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.adminLinkSearch_name;
        }

        this.adminService.findLinksByName(_name, page, sort)
            .subscribe(result => {
                if (result) {
                    this.cancellMessages();

                    console.log(result);
                    this.links = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    setTimeout(() => {
                        this.adminService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('adminLinkSearch_name', _name);
                }
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public getItemForUpdateFunction(id_itemForUpdate: number) {
        this.cancellMessages();
        this.creating = true;
        this.adminBibliotheque = new AdminBibliothequeClass('','','');

        this.adminService.getLinkForUpdate('/' + id_itemForUpdate)
            .subscribe(result => {
                if (result) {
                    this.creating = false;
                    console.log(result);
                    this.adminBibliotheque.name = result.name;
                    this.adminBibliotheque.description = result.description;
                    this.adminBibliotheque.link = result.link;
                    this.itemForChange = result.id;
                    this.saveButtonCaption = 'Modifier';
                }
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

        this.adminService.saveLink(this.adminBibliotheque, urlOption)
            .subscribe(result => {
                if (result) {
                    this.creating = false;
                    console.log(result);
                    this.successCreating = "Well done! Link is saved.";
                    if (this.itemForChange) {
                        this.saveButtonCaption = 'Créer';
                        this.itemForChange = 0;
                    }
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

        this.adminService.deleteLink('/' + id_itemForDelete)
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

    openLinkInNewWindowFunction(link) {
        window.open(link, '_blank');
    }

    private cancellMessages() {
        this.loading = false;
        this.creating = false;
        this.errorLoad = '';
        this.errorCreating = '';
        this.successCreating = '';
    }

}
