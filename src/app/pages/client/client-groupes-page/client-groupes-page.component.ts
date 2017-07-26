import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ClientGroupesPageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = false;
    saving = false;
    loaded = false;
    errorSalaries = 'error';
    errorCreating = '';
    successCreating = '';

    showModal = true;

    itemForChange =  0;
    saveButtonCaption = 'Créer';

    groupes = [];
    salaryeeGroupe = new GroupeClass('', false);

    pager: any = {};

    errorLoad = '';
    totalItems =  0;
    activePage =  1;
    searchName = '';
    currentPage: any;

    _adminAccess = false;

    headers: any[] = [
        { display: 'Nom du groupe', variable: 'name',  filter: 'text' },
        { display: 'Accès',         variable: 'access', filter: 'text' }
    ];
    sortingTarget = '';
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
        this.activePage = page;

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

       // this.salaryeeGroupe.adminAccess = this._adminAccess;
        console.dir(this.salaryeeGroupe);

        this.clientService.addNewGroupe(this.salaryeeGroupe, urlOption)
            .subscribe(result => {
                if (result) {
                    this.saving = false;
                    console.log(result);
                    this.salaryeeGroupe = new GroupeClass('', false);
                    // modal close /////////
                    const _modal = document.getElementById('myModal').firstElementChild;
                     _modal.classList.add('hidden');
                     const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
                    (<HTMLScriptElement>modal_bg).classList.add('hidden');
                    /////////
                    if (this.itemForChange) {
                      this.saveButtonCaption = 'Créer';
                      this.itemForChange = 0;
                      this.successCreating = 'Vos modifications sont enregistrées.';
                    } else {
                      this.successCreating = 'Bien joué! Le groupe est créé.';
                    }
                    this.ngOnInit();
                }
            }, (err) => {
                this.saving = false;
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

    public deleteFunction(id_itemForDelete: number) {
      this.cancellErrorMessage();
      this.cancellSuccessMessage();
      this.loading = true;
        this.emptyTable = false;
        this.clientService.deleteGroupe('/' + id_itemForDelete)
            .subscribe(result => {
                if (result) {
                    this.cancellErrorMessage();
                    console.log(result);
                    this.findGroupByNameFunction(this.searchName, this.activePage, '');
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public getItemForUpdateFunction(groupe: any) {
      this.modalOpen();
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        console.log(groupe);
                    this.salaryeeGroupe.name = groupe.name;
                    this.salaryeeGroupe.adminAccess = groupe.access;
                    this.itemForChange = groupe.id;
                    this.saveButtonCaption = 'Modifier';
    }


    // public adminAccessClicked(e: any) {
    //     this._adminAccess = e.target.checked;
    // }

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
