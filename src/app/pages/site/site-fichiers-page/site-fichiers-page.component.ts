import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'site-fichiers-page',
  templateUrl: './site-fichiers-page.component.html',
  styleUrls: ['./site-fichiers-page.component.css'],
    providers: [SiteService]
})
export class SiteFichiersPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    id_site: number;

    constructor (private siteService: SiteService) {}

    ngOnInit():void {
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
    }

////////////////////////////////////
//     this.emptyTable = false;
//
// * .subscribe(result => {
//     *     if (result) {
//
//         if (this.totalItems === 0) {
//             this.emptyTable = true;
//         }
//
//     * }, (err) => {
//
//     this.emptyTable = true;
/////////////////////////////////

}
