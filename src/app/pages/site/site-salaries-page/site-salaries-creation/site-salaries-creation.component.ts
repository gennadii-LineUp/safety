import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';
import {ErrorMessageHandlerService} from 'app/services/error/error-message-handler.service';
import {SiteService} from '../../../../services/site/site.service';
import {PaginationService} from '../../../../services/pagination/pagination.service';
declare var $:any;

@Component({
  selector: 'site-salaries-creation',
  templateUrl: './site-salaries-creation.component.html',
  styleUrls: ['./site-salaries-creation.component.css'],
    providers: [SiteService, ErrorMessageHandlerService]
})
export class SiteSalariesCreationComponent implements OnInit {

    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) { }

  ngOnInit() {

      //Datepicker Popups calender to Choose date
      $(function(){
          $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker();
          //Pass the user selected date format
          $( "#format" ).change(function() {
              $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker( "option", "dateFormat", $(this).val() );
          });
      });

  }

    gotoEtap2Form() {
        this.router.navigate(['/site/salaries/ajouter-un-salaries-etap2']);
    }

}
