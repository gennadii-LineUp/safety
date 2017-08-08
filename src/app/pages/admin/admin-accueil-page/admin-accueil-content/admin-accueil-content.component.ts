import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarFillService} from '../../../../services/progress-bar-fill.service';
import {AdminService} from '../../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {DataService} from '../../../../services/DataService.service';

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
                public dataService: DataService) {}

    ngOnInit(): void {
        window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
        this.getProgressBarValues();
    }
    ngOnDestroy() {
        window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
    }


  getProgressBarValues(): void {
    const request = this.adminService.homeData();

    const this_new = this;

    const successRequest = (result: any): void => {
      this.loading = false;
      this.progressBarValues = [
        {name: 'clients', value: 0},
        {name: 'sites', value: 0},
        {name: 'employees', value: 0}
      ];
      console.log('======result============');
      console.log(result);
      this.progressBarValues[0].value = result.clients;
      this.progressBarValues[1].value = result.sites;
      this.progressBarValues[2].value = result.employees;
    };


    request
      .subscribe(successRequest, (err) => {
          this.dataService.refreshToken.call(this_new, err, request, successRequest);
          this.errorLoad = this.dataService.returnErrorLoad();
      });
  }

}
