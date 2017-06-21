import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../../services/site/site.service';

@Component({
  selector: 'app-site-fichiers-page',
  templateUrl: './site-fichiers-page.component.html',
  styleUrls: ['./site-fichiers-page.component.css'],
    providers: [SiteService]
})
export class SiteFichiersPageComponent implements OnInit {
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    id_site: number;

    constructor(private siteService: SiteService) {}

    ngOnInit() {
        this.id_site = this.siteService.getIdSite();
        console.log(this.id_site);

        if (!this.id_site) {
            this.id_site = localStorage.id_site;
            console.log('from LS = '+this.id_site);
        }
    }

}
