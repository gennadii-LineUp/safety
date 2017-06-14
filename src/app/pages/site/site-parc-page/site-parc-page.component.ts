import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'site-parc-page',
  templateUrl: './site-parc-page.component.html',
  styleUrls: ['./site-parc-page.component.css']
})
export class SiteParcPageComponent implements OnInit {

  constructor() { }

    ngOnInit() {
        this.datepickerRun();
    }


    datepickerRun() {
        //Datepicker Popups calender to Choose date
        $(function(){
            $( "#datepicker1, #datepicker2, #datepicker3" ).datepicker();
            //Pass the user selected date format
            $( "#format" ).change(function() {
                $( "#datepicker1, #datepicker2" ).datepicker( "option", "dateFormat", $(this).val() );
            });
        });
    }

}
