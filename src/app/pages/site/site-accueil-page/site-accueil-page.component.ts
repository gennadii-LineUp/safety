import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {BackendService} from "../../../services/backend/backend.service";

@Component({
  selector: 'site-accueil-page',
  templateUrl: './site-accueil-page.component.html',
  styleUrls: ['./site-accueil-page.component.css'],
    providers: [SiteService, BackendService]
})
export class SiteAccueilPageComponent implements OnInit, OnDestroy {
    loading = true;
    errorLoad = '';
    imgServer: any;
    showImg: true;

    id_site: number;
    siteName: string;


   constructor(public errorMessageHandlerService: ErrorMessageHandlerService,
               public siteService: SiteService,
               public backendService: BackendService) {}

    ngOnInit() {
        this.id_site = localStorage.id_site;
        this.getAccueilInfoFunction();
        this.getFromServerAccueilImageFunction();
   }

    ngOnDestroy() {}

  public getAccueilInfoFunction() {
    this.siteService.getAccueilInfo(this.id_site)
      .subscribe(result => {
          this.loading = false;
          this.siteName = result.name;
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public getFromServerAccueilImageFunction() {
    this.loading = true;
    const refresh = {
      refresh_token: localStorage.getItem('refresh_token')
    }
    this.backendService.token_refresh((refresh))
      .subscribe(result => {
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('refresh_token', result.refresh_token);
      }, (err) => {
        console.log(err);
      });
  }


  public refresh() {
    this.siteService.getFromServerAccueilImage(this.id_site)
      .subscribe(result => {
        const src = 'data:' + result['Content-type'] + ';base64,';
        this.imgServer = src + result.content;
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


}
