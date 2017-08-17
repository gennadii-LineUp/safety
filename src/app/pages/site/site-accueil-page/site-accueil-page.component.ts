import {Component, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'app-site-accueil-page',
  templateUrl: './site-accueil-page.component.html',
  styleUrls: ['./site-accueil-page.component.css'],
    providers: [SiteService, BackendService]
})
export class SiteAccueilPageComponent extends BasePageComponent implements OnInit {
    loading = true;
    errorLoad = '';
    imgServer: any;
    showImg: true;

    id_site: number;
    siteName: string;


   constructor(public errorMessageHandlerService: ErrorMessageHandlerService,
               public siteService: SiteService,
               public backendService: BackendService) { super(); }

    ngOnInit() {
        this.id_site = localStorage.id_site;
        this.getAccueilInfoFunction();
        this.getFromServerAccueilImageFunction();

        // const refresh = {
        //   refresh_token: localStorage.getItem('refresh_token')
        // };
        // this.backendService.token_refresh(refresh)
        //   .subscribe(result => {
        //     localStorage.setItem('token', result.token);
        //     localStorage.setItem('refresh_token', result.refresh_token);
        //   }, (err) => {
        //     console.log(err);
        //   });
    }

  public getAccueilInfoFunction() {
    this.loading = true;
    this.doRequest(this.siteService, 'getAccueilInfo', [this.id_site], result => {
          this.showImg = true;
          this.loading = false;
          this.siteName = result.name;
      }, (err) => {
        this.loading = false;
        if (err.status === 404) {return; }
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public getFromServerAccueilImageFunction() {
    this.loading = true;
    this.doRequest(this.siteService, 'getFromServerAccueilImage', [this.id_site], result => {
        const src = 'data:' + result['Content-type'] + ';base64,';
        this.imgServer = src + result.content;
      }, (err) => {
        this.loading = false;
        if (err.status === 404) {return; }
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


}
