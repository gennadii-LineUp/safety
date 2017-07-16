import { Component, OnInit } from '@angular/core';
import {TableSortService} from '../../../../services/table-sort.service';
import {SiteService} from '../../../../services/site/site.service';

@Component({
  selector: 'responsable-site',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css'],
    providers: [ SiteService, TableSortService]
})
export class ResponsableSiteComponent implements OnInit {
    emptyTableMobile = true;
    loading = false;
    loadingSalarieUsed = false;
    loaded = false;
    loadedSalarieUsed = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    headers: any[] = [
        { display: 'Nom du salarié', variable: 'name',    filter: 'text' },
        { display: 'Accès',          variable: 'access',  filter: 'text' },
    ];
    mobileHeaders: any[] = [
        { display: 'Nom',       variable: 'name',    filter: 'text' },
        { display: 'n° Sécu',   variable: 'nsecu',  filter: 'text' },
    ];


    constructor(private siteService: SiteService,
                private tableSortService: TableSortService) { }

  ngOnInit() {
      this.siteService.tableMobileViewInit();
  }

////////////////////////////////
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
/////////////////////////////

}
