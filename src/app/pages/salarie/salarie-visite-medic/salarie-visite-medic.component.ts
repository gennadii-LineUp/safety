import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'app-salarie-visite-medic',
  templateUrl: './salarie-visite-medic.component.html',
  styleUrls: ['./salarie-visite-medic.component.css'],
    providers: [SalariesService, BackendService ]
})
export class SalarieVisiteMedicComponent extends BasePageComponent implements OnInit {
  loading = false;
  errorLoad = '';
  visite_medical: string;

  constructor(public salariesService: SalariesService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public backendService: BackendService) { super(); }

  ngOnInit() {
    this.getDataFunction();
  }

  public getDataFunction() {
    this.loading = true;
    this.doRequest(this.salariesService, 'getMedicalVisit', null, result => {
          this.loading = false;
          this.visite_medical = result.medicalVisitDateExpires;
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
  }

}
