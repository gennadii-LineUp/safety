import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';

@Component({
  selector: 'site-accueil-page',
  templateUrl: './site-accueil-page.component.html',
  styleUrls: ['./site-accueil-page.component.css'],
    providers: [SiteService]
})
export class SiteAccueilPageComponent implements OnInit, OnDestroy {
    loading = true;
    errorLoad = '';
    imgServer: any;
    showImg: true;

    id_site: number;
    siteName: string;


   constructor(private errorMessageHandlerService: ErrorMessageHandlerService,
               private siteService: SiteService) {}

    ngOnInit() {
        this.id_site = localStorage.id_site;
        this.getAccueilInfoFunction();
        this.getFromServerAccueilImageFunction();
   }

    ngOnDestroy() {}

  public getAccueilInfoFunction() {
    this.siteService.getAccueilInfo(this.id_site)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          this.siteName = result.name;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public getFromServerAccueilImageFunction() {
    this.loading = true;
    this.siteService.getFromServerAccueilImage(this.id_site)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          this.showImg = true;
          const src = 'data:' + result['Content-type'] + ';base64,';
          this.imgServer = src + result.content;

        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


}
