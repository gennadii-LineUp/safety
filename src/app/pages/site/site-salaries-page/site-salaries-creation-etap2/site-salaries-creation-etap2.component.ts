import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';
import {SiteService} from '../../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
declare var $:any;

@Component({
  selector: 'app-site-salaries-creation-etap2',
  templateUrl: './site-salaries-creation-etap2.component.html',
  styleUrls: ['./site-salaries-creation-etap2.component.css'],
    providers: [SiteService, ErrorMessageHandlerService]
})
export class SiteSalariesCreationEtap2Component implements OnInit {

    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) { }

    ngOnInit() {

        //Datepicker Popups calender to Choose date
        $(function(){
            $( "#datepicker1, #datepicker2, #datepicker3, #datepicker4, #datepicker5" ).datepicker();
            //Pass the user selected date format
            $( "#format" ).change(function() {
                $( "#datepicker1, #datepicker2, #datepicker3, #datepicker4, #datepicker5" ).datepicker( "option", "dateFormat", $(this).val() );
            });
        });

    }

    gotoSalariesPage() {
        this.router.navigate(['/site/salaries']);
    }


}
