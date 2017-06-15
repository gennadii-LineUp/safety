import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {SiteClass} from '../../../models/const/site-class';

@Component({
  selector: 'app-client-sites-page',
  templateUrl: './client-sites-page.component.html',
  styleUrls: ['./client-sites-page.component.css'],
    providers: [ClientService, ErrorMessageHandlerService]
})
export class ClientSitesPageComponent implements OnInit {
    loading: boolean = false;
    errorSalaries: string = 'error';
    errorCreating: string = '';
    successCreating: string = '';

    site: SiteClass[] = [];

    _cacesSiege: boolean = false;
    _cacesSite: boolean = false;
    _medicalVisitSiege: boolean = false;
    _medicalVisitSite: boolean = false;
    _techControlSiege: boolean = false;
    _techControlSite: boolean = false;

    constructor(private clientService: ClientService,
                private router: Router,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
        this.tableMobileViewInit();
    }


    public submitForm(name: string, address: string, postalCode: string, city: string, notificationEmails: string,
                      cacesSiege: boolean,
                      cacesSite: boolean,
                      medicalVisitSiege: boolean,
                      medicalVisitSite: boolean,
                      techControlSiege: boolean,
                      techControlSite: boolean) {

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let newSite = new SiteClass(name,
            address,
            postalCode,
            city,
            notificationEmails,
            this._cacesSiege,
            this._cacesSite,
            this._medicalVisitSiege,
            this._medicalVisitSite,
            this._techControlSiege,
            this._techControlSite);


        this.clientService.addNewSite(newSite)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    this.successCreating = "Well done! You've created a new client.";

                }
            }, (err) => {
                this.loading = false;

                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorCreating = errorStatusKnown;
                    return;
                }

                let error = (JSON.parse(err._body)).errors;

                if (Object.keys(error).length > 0) {
                    this.errorCreating = this.errorMessageHandlerService.errorHandler(error);
                }
            });
    }


    public cacesSiegeClicked(e:any) {
        this._cacesSiege = e.target.checked;
    }
    public cacesSiteClicked(e:any) {
        this._cacesSite = e.target.checked;
    }
    public medicalVisitSiegeClicked(e:any) {
        this._medicalVisitSiege = e.target.checked;
    }
    public medicalVisitSiteClicked(e:any) {
        this._medicalVisitSite = e.target.checked;
    }
    public techControlSiegeClicked(e:any) {
        this._techControlSiege = e.target.checked;
    }
    public techControlSiteClicked(e:any) {
        this._techControlSite = e.target.checked;
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
        this.errorCreating = '';
    }
    public cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }

    public gotoClientHomeForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/client/accueil']);

    }

    // this.cancellErrorMessage();
    // this.cancellSuccessMessage();
    // this.loading = true;

}
