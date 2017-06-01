import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {ClientService} from '../../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {SiteClass} from '../../../../models/const/site-class';

@Component({
  selector: 'client-sites-content',
  templateUrl: './client-sites-content.component.html',
  styleUrls: ['./client-sites-content.component.css'],
    providers: [ClientService, ErrorMessageHandlerService]
})
export class ClientSitesContentComponent implements OnInit {
    loading: boolean = false;
    errorSalaries: string = 'error';
    errorCreating: string = '';
    successCreating: string = '';

    site: SiteClass[] = [];

    constructor(private clientService: ClientService,
                private router: Router,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
        this.tableMobileViewInit();
    }

    clickMe(name:string, address:string){
        console.log('name: ' + name + ', address ' + address);
    }

    public submitNewSitesFunction(client_newSitesForm: NgForm) {
        // this.cancellErrorMessage();
        // this.cancellSuccessMessage();
        // this.loading = true;
        //
        // let newSite = new SiteClass(client_newSitesForm.value.name,
        //     client_newSitesForm.value.address,
        //     client_newSitesForm.value.postalCode,
        //     client_newSitesForm.value.city,
        //     client_newSitesForm.value.notificationEmails,
        //     client_newSitesForm.value.cacesSiege,
        //     client_newSitesForm.value.cacesSite,
        //     client_newSitesForm.value.medicalVisitSiege,
        //     client_newSitesForm.value.medicalVisitSite,
        //     client_newSitesForm.value.techControlSiege,
        //     client_newSitesForm.value.techControlSite);

        console.dir('submitNewSitesFunction==');


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
        this.errorSalaries = '';
    }
    private cancellSuccessMessage() {
        this.loading = false;
        //this.successCreating = '';
    }

    private gotoClientHomeForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/client/accueil']);

    }

    // this.cancellErrorMessage();
    // this.cancellSuccessMessage();
    // this.loading = true;

}
