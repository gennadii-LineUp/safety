import { Component, OnInit } from '@angular/core';
import {ProgressBarFillService} from '../../../../services/progress-bar-fill.service';
import {ProgressBarTESTclass} from 'app/models/const/progress-bar-test-class';
import {AdminService} from '../../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';

@Component({
  selector: 'admin-accueil-content',
  templateUrl: './admin-accueil-content.component.html',
  styleUrls: ['./admin-accueil-content.component.css'],
    providers: [AdminService, ErrorMessageHandlerService, ProgressBarFillService],
})
export class AdminAccueilContentComponent implements OnInit {
    loading: boolean = true;
    errorLoad: string = '';

    private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

    progressBarValues = [];

    constructor(private adminService: AdminService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private progressBarFillService: ProgressBarFillService){}

    ngOnInit(): void {
        this.getProgressBarValues();
    }

    getProgressBarValues(): void {
      // this.progressBarFillService.get().then(values => this.progressBarValues = values);

        this.adminService.homeData()
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    this.progressBarValues = [
                        {name: 'clients', value: 0},
                        {name: 'sites', value: 0},
                        {name: 'employees', value: 0}
                    ];



                    this.progressBarValues[0].value = result.clients;
                    this.progressBarValues[1].value = result.sites;
                    this.progressBarValues[2].value = result.employees;
                }
            }, (err) => {


                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }

                this.errorLoad = err;
             });

    }


}
