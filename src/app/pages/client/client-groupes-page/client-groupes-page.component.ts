import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {GroupeClass} from '../../../models/const/groupe-class';

@Component({
  selector: 'app-client-groupes-page',
  templateUrl: './client-groupes-page.component.html',
  styleUrls: ['./client-groupes-page.component.css'],
    providers: [ClientService, ErrorMessageHandlerService]
})
export class ClientGroupesPageComponent implements OnInit {
    loading: boolean = false;
    errorSalaries: string = 'error';
    errorCreating: string = '';
    successCreating: string = '';

    groupe: GroupeClass[] = [];

    constructor(private clientService: ClientService,
                private router: Router,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
        this.tableMobileViewInit();
    }

    public submitForm(name: string,
                      adminAccess: boolean = false) {

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let newGroupe = new GroupeClass(name, adminAccess);

        console.dir(newGroupe);

        this.clientService.addNewGroupe(newGroupe)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log('======result====OK======');
                    console.log(result);
                    this.successCreating = "Well done! You've created a new group.";

                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                console.log(err);

                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorCreating = errorStatusKnown;
                    return;
                }

                let error = (JSON.parse(err._body)).errors;
                //console.log(error);
                //console.log(Object.keys(error).length);

                if (Object.keys(error).length > 0) {
                    this.errorCreating = this.errorMessageHandlerService.errorHandler(error);
                }
            });
    }

    private cancellErrorMessage() {
        this.loading = false;
        this.errorSalaries = '';
        this.errorCreating = '';
    }
    private cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }

    private gotoClientGroupesForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/client/groupes']);

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
