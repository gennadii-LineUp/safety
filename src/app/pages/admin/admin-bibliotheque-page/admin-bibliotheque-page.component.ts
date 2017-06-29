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
        this.findLinkByNameFunction('', 1, '');
        this.adminService.tableMobileViewInit();
    }

    ngOnDestroy() {
        localStorage.removeItem('adminLinkSearch_page');
        localStorage.removeItem('adminLinkSearch_name');
    }

//////////////////////////////////////
//     this.emptyTable = false;
//
// * .subscribe(result => {
//     *     if (result) {
//
//         if (this.totalItems === 0) {
//             this.emptyTable = true;
//         }
//
//     * }, (err) => {
//
//     this.emptyTable = true;
/////////////////////////////////////////////

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
                    this.loading = false;

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


    public submitForm(name: string, description: string, link: string) {
        this.cancellMessages();
        this.creating = true;
        console.dir(this.adminBibliotheque);

        this.adminService.addNewLink(this.adminBibliotheque)
            .subscribe(result => {
                if (result) {
                    this.creating = false;
                    console.log(result);
                    this.successCreating = "Well done! You've created a new link.";
                }
            }, (err) => {
                this.creating = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public gotoAdminBibliothequeForm() {
        this.loading = true;
        this.ngOnInit();
        this.cancellMessages();
        this.router.navigate(['/admin/bibliotheque']);
    }

    private cancellMessages() {
        this.loading = false;
        this.creating = false;
        this.errorLoad = '';
        this.errorCreating = '';
        this.successCreating = '';
    }

}
