import { Component, OnInit } from '@angular/core';
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
    // pager object
    pager: any = {};


    currentPage: number = 0;
    firstPage: number = 0;
    secondPage: number = 0;
    thirdPage: number = 0;
    forthPage: number = 0;
    fifthPage: number = 0;
    hiddenPages: boolean = false;

    lastButOnePage: number = 0;
    lastPage: number = 0;
    numItemsPerPage: number = 0;
    totalItems: number = 0;

  constructor(private adminService: AdminService,
              private paginationService: PaginationService,
              private router: Router) { }

    ngOnInit() {
        this.tableMobileViewInit();
        this.getClientList(1);

    }

    getClientList(page): void {
        this.loading = true;
        this.adminService.clientList(page)
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log('======result============');
                    console.log(result);
                    this.clients = result.items;
                    this.totalItems = +result.pagination.totalCount;


                    let pagination = result.pagination;
                    this.totalItems = +pagination.totalCount;
                    let totalPages = +pagination.pageCount;
                    let visiblePages = pagination.pagesInRange.length;
                    this.currentPage = +pagination.current;
                    this.firstPage = +pagination.pagesInRange[0];
                    this.secondPage = +pagination.pagesInRange[1];
                    this.thirdPage = +pagination.pagesInRange[2];
                    this.forthPage = +pagination.pagesInRange[3];
                    this.fifthPage = +pagination.pagesInRange[4];
                    this.hiddenPages = (totalPages + 1) > visiblePages;
                    if (totalPages > 5) {
                        console.log('yes');
                        this.lastButOnePage = totalPages-1;
                        this.lastPage = totalPages;
                    }

/////////start//////////////////////
                    this.setPage(page);
/////////end/////////////////////////////////
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
/////////start//////////////////////
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.paginationService.getPager(this.totalItems, page);

        // get current page of items
     //   this.pagedItems = this.clients;
    }
/////////end/////////////////////////////////


    gotoAnotherPage(event:any) {
      console.dir(+event.target.text);

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
