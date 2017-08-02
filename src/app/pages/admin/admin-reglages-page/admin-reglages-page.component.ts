import { Component, OnInit } from '@angular/core';
import {AdminReglagesClass} from '../../../models/const/admin-reglages-class';
import {AdminService} from '../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'admin-reglages-page',
  templateUrl: './admin-reglages-page.component.html',
  styleUrls: ['./admin-reglages-page.component.css'],
    providers: [AdminService, ErrorMessageHandlerService]
})
export class AdminReglagesPageComponent implements OnInit {
    loading = false;
    loadingGroupes = true;
    noGroups = false;
    loaded = false;
    errorCreating = '';
    successCreating = '';

    errorLoad = '';

    reglages = new AdminReglagesClass('', '', '', '');

    defaultReglages = new AdminReglagesClass('http://www.moncompteformation.gouv.fr/', '', '', '');


    constructor(public adminService: AdminService,
                public errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
        this.getExistingReglages();
    }

    public getExistingReglages() {
        this.loading = true;

        this.adminService.getExistingReglages()
            .subscribe(result => {
                    this.loading = false;
                    this.reglages.monCompteFormationLink = result.monCompteFormationLink;
                    this.reglages.notificationEmails = result.notificationEmails.join(', ');
            }, (err) => {
                this.loading = false;
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    submitForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        this.adminService.updateReglages(this.reglages)
            .subscribe(result => {
                    this.loading = false;
                    this.successCreating = "Well done! You've updated your settings.";
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
