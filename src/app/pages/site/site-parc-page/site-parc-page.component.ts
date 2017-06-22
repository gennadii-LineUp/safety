import { Component, OnInit  } from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
declare var $:any;

@Component({
  selector: 'site-parc-page',
  templateUrl: './site-parc-page.component.html',
  styleUrls: ['./site-parc-page.component.css'],
    providers: [SiteService]
})
export class SiteParcPageComponent implements OnInit {
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    id_site: number = 0;

    constructor(private siteService: SiteService) {}

    ngOnInit() {
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);

        $(document).ready(() => {
            this.datepickerRun();
        });
    }



    datepickerRun() {
       // $(() => {
            $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker();
            //Pass the user selected date format
            $( "#format" ).change(() => {
                $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker( "option", "dateFormat", $(this).val() );
            });
        //});
    }

}
