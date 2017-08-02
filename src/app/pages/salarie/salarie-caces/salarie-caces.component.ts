import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';

@Component({
  selector: 'app-salarie-caces',
  templateUrl: './salarie-caces.component.html',
  styleUrls: ['./salarie-caces.component.css'],
    providers: [SalariesService]
})
export class SalarieCacesComponent implements OnInit {
  loading = false;
  errorLoad = '';
  visite_caces: string;
  imgServer: any;
  showImg: true;

  constructor(public salariesService: SalariesService,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    this.getDataFunction();
  }

  public getDataFunction() {
    this.loading = true;
    this.salariesService.getCacesVisit()
      .subscribe(result => {
          this.loading = false;
          console.log(result);
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
    this.salariesService.getFromServerCacesImage()
      .subscribe(result => {
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
