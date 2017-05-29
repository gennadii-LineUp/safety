import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';

@Component({
  selector: 'admin-clients-content',
  templateUrl: './admin-clients-content.component.html',
  styleUrls: ['./admin-clients-content.component.css'],
    providers: [AdminService]
})
export class AdminClientsContentComponent implements OnInit {
    loading: boolean = true;
    loaded: boolean = false;
    updating: boolean = false;
    errorLoad: string = '';
    successUpdate: string = '';
    errorUpdate: string = '';

    clients = [];

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
              private router: Router) { }

    ngOnInit() {
        this.tableMobileViewInit();
        this.getClientList();

    }

    getClientList(): void {
        this.adminService.clientList()
            .subscribe(result => {
                if (result) {
                    this.loading = false;

                    console.log('======result============');
                    let clients = result.items;
                    this.clients = clients;

                    let pagination = result.pagination;
                    console.log(pagination);

                    this.numItemsPerPage = +pagination.numItemsPerPage;
                    this.totalItems = +pagination.totalCount;
                    let totalPages = +pagination.pageCount; //Math.ceil(this.totalItems / this.numItemsPerPage);
                   // console.log(totalPages + ' total pages' + typeof +totalPages);
                    let visiblePages = pagination.pagesInRange.length;
                  //  console.log(visiblePages + ' visible pages' + typeof +visiblePages);

                    this.firstPage = +pagination.pagesInRange[0];
                    this.secondPage = +pagination.pagesInRange[1];
                    this.thirdPage = +pagination.pagesInRange[2];
                    this.forthPage = +pagination.pagesInRange[3];
                    this.fifthPage = +pagination.pagesInRange[4];
                    this.hiddenPages = (totalPages + 1) > visiblePages;

                    // if (totalPages = 4) { //(visiblePages+2)) {
                    //     this.lastPage = totalPages;
                    // }
                    if (totalPages > 5) {
                        console.log('yes');
                        this.lastButOnePage = totalPages-1;
                        this.lastPage = totalPages;
                    }


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

    gotoAnotherPage(event:any) {
      console.dir(event.target.text);
        console.log( typeof +event.target.text);
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
