import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'app-salarie-caces',
  templateUrl: './salarie-caces.component.html',
  styleUrls: ['./salarie-caces.component.css'],
    providers: [SalariesService, BackendService ]
})
export class SalarieCacesComponent extends BasePageComponent implements OnInit {
  loading = false;
  errorLoad = '';
  visite_caces: string;
  imgServer: any;
  showImg: true;

  constructor(public salariesService: SalariesService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public backendService: BackendService) { super(); }

  ngOnInit() {
    this.getDataFunction();
  }

  public getDataFunction() {
    this.loading = true;
    this.doRequest(this.salariesService, 'getCacesVisit', null, result => {
          this.loading = false;
          this.visite_caces = result.cacesDateExpires;
          this.getFromServerImageFunction();
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getFromServerImageFunction() {
    this.loading = true;
    this.doRequest(this.salariesService, 'getFromServerCacesImage', null, result => {
          this.loading = false;
          this.showImg = true;
          const src = 'data:' + result['Content-type'] + ';base64,';
          this.imgServer = src + result.content;
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
