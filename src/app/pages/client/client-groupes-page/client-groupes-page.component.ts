import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {GroupeClass} from '../../../models/const/groupe-class';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {TableSortService} from '../../../services/table-sort.service';

@Component({
  selector: 'app-client-groupes-page',
  templateUrl: './client-groupes-page.component.html',
  styleUrls: ['./client-groupes-page.component.css'],
    providers: [ClientService, PaginationService, TableSortService]
})
export class ClientGroupesPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = false;
    saving: boolean = false;
    loaded: boolean = false;
    errorSalaries: string = 'error';
    errorCreating: string = '';
    successCreating: string = '';

    itemForChange: number = 0;
    saveButtonCaption: string = 'Créer';

    groupes = [];
    salaryeeGroupe = new GroupeClass('', false);

    pager: any = {};

    errorLoad: string = '';
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;

    _adminAccess: boolean = false;

    headers: any[] = [
        { display: 'Nom du groupe', variable: 'name',  filter: 'text' },
        { display: 'Accès',         variable: 'access', filter: 'text' }
    ];
    sortingTarget: string = '';
    public getSortingTarget(){
        this.sortingTarget = this.tableSortService._getSortingTarget();
    }


    constructor(private clientService: ClientService,
                private router: Router,
                private paginationService: PaginationService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private tableSortService: TableSortService) {}

    ngOnInit() {
        this.findGroupByNameFunction('', 1, '');
    }

    ngOnDestroy() {
        localStorage.removeItem('clientGroupSearch_page');
        localStorage.removeItem('clientGroupSearch_name');
    }


    public onInitChecking() {
        this.searchName = localStorage.clientGroupSearch_name;
        this.activePage = +localStorage.clientGroupSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findGroupByNameFunction(this.searchName, this.activePage + 1, '');
        } else {
            this.findGroupByNameFunction('', 1, '');//this.getGroupList(1);
        }
        console.log('====' + this.searchName);
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findGroupByNameFunction(name: string, page: any = 1, sort: string) {
        this.loading = true;
        this.emptyTable = false;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientGroupSearch_name;
        }

        this.clientService.findGroupeByName(_name, page, sort)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);

                    this.groupes = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    if (this.totalItems === 0) {
                        this.emptyTable = true;
                    }
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.clientService.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientGroupSearch_name', _name);
                }
            }, (err) => {
                this.loading = false;
                this.emptyTable = true;
                console.log('====error=============');
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
                console.log(err);
            });
    }


    public submitForm(name: string, adminAccess: boolean) {
        let urlOption = '';
        if (this.itemForChange) {
            urlOption = '/' + this.itemForChange;
            this.saveButtonCaption = 'Modifier';
        }

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.saving = true;

        this.salaryeeGroupe.adminAccess = this._adminAccess;
        console.dir(this.salaryeeGroupe);

        this.clientService.addNewGroupe(this.salaryeeGroupe, urlOption)
            .subscribe(result => {
                if (result) {
                    this.saving = false;
                    console.log(result);
                    this.successCreating = 'Well done! Group is saved.';
                    if (this.itemForChange) {
                      this.saveButtonCaption = 'Créer';
                      this.itemForChange = 0;
                    }
                    this.ngOnInit();
                }
            }, (err) => {
                console.log('====error=============');
                this.saving = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public deleteFunction(id_itemForDelete: number) {
        this.loading = true;
        this.emptyTable = false;

        this.clientService.deleteGroupe('/' + id_itemForDelete)
            .subscribe(result => {
                if (result) {
                    this.cancellErrorMessage();
                    console.log(result);
                    this.ngOnInit();
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public getItemForUpdateFunction(id_itemForUpdate: number) {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.saving = true;
        this.salaryeeGroupe = new GroupeClass('', false);
        console.log(id_itemForUpdate);

        this.clientService.getGroupeForUpdate('/' + id_itemForUpdate)
            .subscribe(result => {
                if (result) {
                    this.saving = false;
                    console.log(result);
                    this.salaryeeGroupe.name = result.name;
                    this.salaryeeGroupe.adminAccess = result.adminAccess;
                    this.itemForChange = result.id;
                    this.saveButtonCaption = 'Modifier';
                }
            }, (err) => {
                this.saving = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public adminAccessClicked(e: any) {
        this._adminAccess = e.target.checked;
    }

    private cancellErrorMessage() {
        this.loading = false;
        this.saving = false;
        this.errorLoad =  '';
        this.errorSalaries = '';
        this.errorCreating = '';
    }
    public cancellSuccessMessage() {
        this.loading = false;
        this.saving = false;
        this.successCreating = '';
    }

}
