import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';

@Component({
  selector: 'app-salarie-visite-medic',
  templateUrl: './salarie-visite-medic.component.html',
  styleUrls: ['./salarie-visite-medic.component.css'],
    providers: [SalariesService]
})
export class SalarieVisiteMedicComponent implements OnInit {
  loading = false;
  errorLoad = '';
  visite_medical: string;

  constructor(public salariesService: SalariesService,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    this.getDataFunction();
  }

  public getDataFunction() {
    this.loading = true;
    this.salariesService.getMedicalVisit()
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.visite_medical = result.medicalVisitDateExpires;
        }
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
