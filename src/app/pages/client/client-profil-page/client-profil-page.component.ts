import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {ClientClass} from '../../../models/const/client-class';

@Component({
  selector: 'app-client-profil-page',
  templateUrl: './client-profil-page.component.html',
  styleUrls: ['./client-profil-page.component.css'],
    providers: [ClientService, ErrorMessageHandlerService]
})
export class ClientProfilPageComponent implements OnInit {
    loading: boolean = true;
    updating: boolean = false;
    errorLoad: string = '';
    successUpdate: string = '';
    errorUpdate: string = '';

    billingAddressIsDifferent: boolean = true;

    client = new ClientClass('','','','','',true,'','','','','',0,'','','',0);

    constructor(private router: Router,
                private clientService: ClientService,
                private errorMessageHandlerService: ErrorMessageHandlerService){}

    ngOnInit(): void {
        this.getClientProfilData();
    }

    public getClientProfilData(): void {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        this.clientService.getClientProfilData()
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.dir(result);

                    let currentClient = new ClientClass(result.email,
                        result.company,
                        result.address,
                        result.postalCode,
                        result.city,
                        result.billingAddressIfDifferent,
                        result.diffName,
                        result.diffAddress,
                        result.diffPostalCode,
                        result.diffCity,
                        result.phone,
                        result.numberSiret,
                        result.contactName,
                        result.contactPhone,
                        result.contactEmail,
                        result.employeesLimit);

                    this.client = currentClient;
                    console.dir(this.client);


                    // this.progressBarValues[0].value = result.clients;
                    // this.progressBarValues[1].value = result.sites;
                    // this.progressBarValues[2].value = result.employees;
                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }

                //let error = (JSON.parse(err._body)).errors;
                console.log(err);
                this.errorLoad = err;//this.errorMessageHandlerService.errorHandler(err);

            });

    }


    public tableMobileViewInit() {
        let headertext = [],
            headers = document.querySelectorAll('th'),
            tablerows = document.querySelectorAll('th'),
            tablebody = document.querySelector('tbody');
        if (document.querySelector('table')) {
            for(let i = 0; i < headers.length; i++) {
                let current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/,''));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute('data-th', headertext[j]);
                }
            }
        }
    }

    private cancellErrorMessage() {
        this.loading = false;
        this.updating = true;
        this.errorUpdate = '';
        this.errorLoad = '';
    }
    public cancellSuccessMessage() {
        this.updating = false;
        //this.successCreating = '';
    }

    public submitNewProfilClientFunction() {
        this.cancellErrorMessage();
        console.log('submit');
        this.updating = true;
    }

    public gotoClientHomePage() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/client/accueil']);
    }

    public toggleDifferentBillingAddress(checkbox) {
        this.billingAddressIsDifferent = !checkbox.target.checked;
    }

}
