import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {DataService} from '../../../services/DataService.service';
import { Router, ActivatedRoute } from '@angular/router';
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
        window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
        this.getAccueilInfoFunction();
        this.getFromServerAccueilImageFunction();
   }

    ngOnDestroy() {
        window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
    }

  public getAccueilInfoFunction() {
    this.siteService.getAccueilInfo(this.id_site)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
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
          console.log(result);
          const src = 'data:' + result.contentType + ';base64,';
          console.log(src);
          this.imgServer = src + result.content;

        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


}
