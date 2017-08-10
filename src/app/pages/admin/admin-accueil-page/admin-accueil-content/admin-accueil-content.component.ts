import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarFillService} from '../../../../services/progress-bar-fill.service';
import {AdminService} from '../../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {BasePageComponent} from '../../../base/base-page.component';
import {BackendService} from '../../../../services/backend/backend.service';

@Component({
  selector: 'admin-accueil-content',
  templateUrl: './admin-accueil-content.component.html',
  styleUrls: ['./admin-accueil-content.component.css'],
  providers: [AdminService, ProgressBarFillService, BackendService],
})
export class AdminAccueilContentComponent extends BasePageComponent implements OnInit, OnDestroy {
  loading = true;
  errorLoad = '';
  progressBarValues = [];

  public cancellErrorMessage() {
    this.loading = false;
    this.errorLoad = '';
  }

  constructor(public adminService: AdminService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public progressBarFillService: ProgressBarFillService,
              public backendService: BackendService) { super(); }

  ngOnInit(): void {
    window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
    this.getProgressBarValues();
  }
  ngOnDestroy() {
    window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
  }

  getProgressBarValues(): void {

    this.doRequest(this.adminService, 'homeData', null, result => {
      this.loading = false;
      this.progressBarValues = [
        {name: 'clients', value: 0},
        {name: 'sites', value: 0},
        {name: 'employees', value: 0}
      ];
      this.progressBarValues[0].value = result.clients;
      this.progressBarValues[1].value = result.sites;
      this.progressBarValues[2].value = result.employees;
    }, err => {
      console.log(err);
      this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
    });
  }

}
