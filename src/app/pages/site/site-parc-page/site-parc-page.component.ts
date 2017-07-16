import { Component, OnInit  } from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {DataService} from "../../../services/DataService.service";
declare var $:any;

@Component({
  selector: 'site-parc-page',
  templateUrl: './site-parc-page.component.html',
  styleUrls: ['./site-parc-page.component.css'],
    providers: [SiteService, TableSortService, DataService]
})
export class SiteParcPageComponent implements OnInit {
    emptyTable = true;
    loading = false;
    loadingSalarieUsed = false;
    loaded = false;
    loadedSalarieUsed = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    id_site =  0;

    headers: any[] = [
        { display: 'Immatriculation', variable: 'name',         filter: 'text' },
        { display: 'N° de parc',      variable: 'parkNumber',   filter: 'text' },
        { display: 'Type',            variable: 'category',     filter: 'text' },
        { display: 'Modèle',          variable: 'model',        filter: 'text' },
        { display: 'Marque',          variable: 'mark',         filter: 'text' }
    ];


    constructor(private siteService: SiteService,
                private tableSortService: TableSortService,
                private dataService: DataService) {}

    ngOnInit() {
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
        this.siteService.tableMobileViewInit();

        $(document).ready(() => {
            this.datepickerRun();
        });
    }


/////////////////////////////////////////
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
/////////////////////////////////////////


    datepickerRun() {
       // $(() => {
            this.dataService.datepickerFranceFormat();
            $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker();
            $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker( 'option', 'changeYear', true );
            //Pass the user selected date format
            $( "#format" ).change(() => {
                $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker( "option", "dateFormat", $(this).val() );
            });
        //});
    }

}
