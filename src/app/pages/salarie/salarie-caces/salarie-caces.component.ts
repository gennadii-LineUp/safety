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

  constructor(private salariesService: SalariesService,
              private errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    this.getDataFunction();
  }

  public getDataFunction() {
    this.loading = true;
    this.salariesService.getCacesVisit()
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.visite_caces = result.cacesDateExpires;
          this.getFromServerImageFunction();
        }
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
        if (result) {
          console.log(result);
          this.loading = false;
          this.showImg = true;
          const src = 'data:' + result.headers._headers['[[Entries]]']['0'].value['0'] + ';base64,';
          console.log(src);
          this.imgServer = src + result._body;

        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  private cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
  }

}
