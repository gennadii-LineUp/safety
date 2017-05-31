import { Component, OnInit} from '@angular/core';
import { Router}    from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {PaginationService} from '../../../../services/pagination/pagination.service';

@Component({
  selector: 'admin-clients-content',
  templateUrl: './admin-clients-content.component.html',
  styleUrls: ['./admin-clients-content.component.css'],
    providers: [AdminService, PaginationService]
})
export class AdminClientsContentComponent implements OnInit {
    loading: boolean = true;
    loaded: boolean = false;
    updating: boolean = false;
    errorLoad: string = '';
    successUpdate: string = '';
    errorUpdate: string = '';

    clients = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;

    //searchWrapper = document.getElementsByClassName("search-wrapper");


  constructor(private adminService: AdminService,
              private paginationService: PaginationService,
              private router: Router) { }



    ngOnInit() {
        //this.tableMobileViewInit();
        this.findClientByNameFunction('');
        console.log(localStorage);
    }

    ngOnDestroy() {
        localStorage.removeItem('adminClientsSearch_page');
        localStorage.removeItem('adminClientsSearch_name');
    }


    public onInitChecking() {
        this.searchName = localStorage.adminClientsSearch_name;
        this.activePage = +localStorage.adminClientsSearch_page;

        if (this.searchName && this.activePage) {
            console.log('== from local storage ==');
            this.findClientByNameFunction(this.searchName, this.activePage + 1);
        } else {
            this.getClientList(1);
        }
        console.log('====' + this.searchName);
    }


    getClientList(page): void {
        this.loading = true;
        this.adminService.clientList(page)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log(result);
                    this.clients = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    this.currentPage = +result.pagination.current;

                    this.setPage(page);

                    this.loaded = true;
                    setTimeout(() => {
                        this.tableMobileViewInit();
                    }, 200);
                }
            }, (err) => {
                this.loading = false;
                // let error = (JSON.parse(err._body)).errors;
                console.log('====error=============');
                this.errorLoad = err;
                console.log(err);
                //     this.errorCreating = this.errorMessageHandlerService.errorHandler(error);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    public findClientByNameFunction(name:string, page:any = 1) {
        this.loading = true;
        let _name = name;
        if (name === 'lineUp') {
            _name = localStorage.adminClientsSearch_name;
        }

        this.adminService.findClientByName(_name, page)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log(result);
                    this.clients = result.items;
                    this.totalItems = +result.pagination.totalCount;
                    console.log('ITEMS  ' + this.totalItems);
                    this.currentPage = +result.pagination.current;

                    this.setPage(this.currentPage);

                    this.loaded = true;
                    setTimeout(() => {
                        this.tableMobileViewInit();
                    }, 200);
                    localStorage.setItem('adminClientsSearch_name', _name);
                   // localStorage.setItem('adminClientsSearch_page', this.currentPage);
                }
            }, (err) => {
                this.loading = false;
                console.log('====error=============');
                this.errorLoad = err;
                console.log(err);
            });
    }

    gotoNewClientForm() {
        this.router.navigate(['/admin/client/ajouter-un-client']);
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
        this.loading = false;
        //this.updating = true;
       // this.errorUpdate = '';
        this.errorLoad = '';
    }



}
