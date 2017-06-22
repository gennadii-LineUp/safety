import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {DataService} from '../../../services/DataService.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'site-accueil-page',
  templateUrl: './site-accueil-page.component.html',
  styleUrls: ['./site-accueil-page.component.css'],
    providers: [SiteService]
})
export class SiteAccueilPageComponent implements OnInit {
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    id_site: number;


   constructor(private dataService: DataService) {}

    ngOnInit() {
        this.id_site = localStorage.id_site;

        // this.id_site = this.siteService.getIdSite();       // doesn't work

        //console.log('from component');                      // doesn't work
        // this.dataService.getData().subscribe(data => {     // doesn't work
        //     this.id_site = data;
        // })
        console.log('get from LS ' + this.id_site);
   }



}
