import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarFillService} from '../../../../services/progress-bar-fill.service';
import {ProgressBarTESTclass} from 'app/models/const/progress-bar-test-class';
import {AdminService} from '../../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';

@Component({
  selector: 'admin-accueil-content',
  templateUrl: './admin-accueil-content.component.html',
  styleUrls: ['./admin-accueil-content.component.css'],
    providers: [AdminService, ProgressBarFillService],
})
export class AdminAccueilContentComponent implements OnInit, OnDestroy {
    loading = true;
    errorLoad = '';
    progressBarValues = [];

  public cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

    constructor(public adminService: AdminService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public progressBarFillService: ProgressBarFillService) {}

    ngOnInit(): void {
        window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
        this.getProgressBarValues();
    }
    ngOnDestroy() {
        window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
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

                    console.log('======result============');
                   // console.log(typeof result);
                    console.log(result);
                    this.progressBarValues[0].value = result.clients;
                    this.progressBarValues[1].value = result.sites;
                    this.progressBarValues[2].value = result.employees;
                }
            }, (err) => {
               // let error = (JSON.parse(err._body)).errors;
                console.log('====error=============');
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);

                //
                // let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                // if (errorStatusKnown) {
                //     this.errorLoad = errorStatusKnown;
                //     return;
                // }
                //
                // this.errorLoad = err;
                // console.log(err);

                //     this.errorCreating = this.errorMessageHandlerService.errorHandler(error);
                // this.loading = false;
            });

    }


}
