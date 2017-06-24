import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {GroupeClass} from '../../../models/const/groupe-class';
import {PaginationService} from '../../../services/pagination/pagination.service';

@Component({
  selector: 'app-client-groupes-page',
  templateUrl: './client-groupes-page.component.html',
  styleUrls: ['./client-groupes-page.component.css'],
    providers: [ClientService, PaginationService]
})
export class ClientGroupesPageComponent implements OnInit {
    loading: boolean = false;
    saving: boolean = false;
    loaded: boolean = false;
    errorSalaries: string = 'error';
    errorCreating: string = '';
    successCreating: string = '';

    groupes: GroupeClass[] = [];
    pager: any = {};

    errorLoad: string = '';
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;

    _adminAccess: boolean = false;

    constructor(private clientService: ClientService,
                private router: Router,
                private paginationService: PaginationService,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
        this.findGroupByNameFunction('');
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
            this.findGroupByNameFunction(this.searchName, this.activePage + 1);
        } else {
            this.findGroupByNameFunction('');//this.getGroupList(1);
        }
        console.log('====' + this.searchName);
    }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findGroupByNameFunction(name:string, page:any = 1) {
        this.loading = true;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.clientGroupSearch_name;
        }

        this.clientService.findGroupeByName(_name, page)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);

                    this.groupes = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('clientGroupSearch_name', _name);
                }
            }, (err) => {
                this.loading = false;
                console.log('====error=============');
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);

                //     let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                // if (errorStatusKnown) {
                //     this.errorLoad = errorStatusKnown;
                //     return;
                // }
                //
                // this.errorLoad = err;
                console.log(err);
            });
    }

    
    public submitForm(name: string,
                      adminAccess: boolean) {

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.saving = true;

        let newGroupe = new GroupeClass(name, this._adminAccess);

        console.dir(newGroupe);

        this.clientService.addNewGroupe(newGroupe)
            .subscribe(result => {
                if (result) {
                    this.saving = false;
                    console.log('======result====OK======');
                    console.log(result);
                    this.successCreating = "Well done! You've created a new group.";
                }
            }, (err) => {
                console.log('====error=============');
                this.saving = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);

                // let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                // if (errorStatusKnown) {
                //     this.errorCreating = errorStatusKnown;
                //     return;
                // }
                //
                // let error = (JSON.parse(err._body)).errors;
                //
                // if (Object.keys(error).length > 0) {
                //     this.errorCreating = this.errorMessageHandlerService.errorHandler(error);
                // }
            });
    }

    public adminAccessClicked(e:any) {
        this._adminAccess = e.target.checked;
    }

    private cancellErrorMessage() {
        this.loading = false;
        this.saving = false;
        this.errorSalaries = '';
        this.errorCreating = '';
    }
    public cancellSuccessMessage() {
        this.loading = false;
        this.saving = false;
        this.successCreating = '';
    }
    private gotoClientGroupesForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/client/groupes']);
        this.ngOnInit();
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

}
