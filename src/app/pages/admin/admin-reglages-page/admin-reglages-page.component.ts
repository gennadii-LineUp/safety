import { Component, OnInit } from '@angular/core';
import {AdminReglagesClass} from '../../../models/const/admin-reglages-class';
import {AdminService} from '../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'admin-reglages-page',
  templateUrl: './admin-reglages-page.component.html',
  styleUrls: ['./admin-reglages-page.component.css'],
    providers: [AdminService, ErrorMessageHandlerService, BackendService]
})
export class AdminReglagesPageComponent extends BasePageComponent implements OnInit {
    loading = false;
    loadingGroupes = true;
    loaded = false;
    errorCreating = '';
    successCreating = '';

    errorLoad = '';

    reglages = new AdminReglagesClass('', '', '', '', '');

    defaultReglages = new AdminReglagesClass('http://www.moncompteformation.gouv.fr/', '', '', '', '');


    constructor(public adminService: AdminService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public backendService: BackendService) { super(); }


    ngOnInit() {
        this.getExistingReglages();
    }

    public getExistingReglages() {
        this.loading = true;

        this.doRequest(this.adminService, 'getExistingReglages', null, result => {
                    this.loading = false;
                    this.reglages.monCompteFormationLink = result.monCompteFormationLink;
                    this.reglages.notificationEmails = result.notificationEmails.join(', ');
                    this.reglages.email = result.email;
            }, (err) => {
                this.loading = false;
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    submitForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        this.doRequest(this.adminService, 'updateReglages', [this.reglages], result => {
                    this.loading = false;
                    this.successCreating = 'Bien joué! Vous avez mis à jour vos paramètres.';
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public setDefaultReglages() {
        this.reglages = this.defaultReglages;
    }

    public cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }
    public cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }
}
