import { Component, OnInit  } from '@angular/core';
declare var $:any;

@Component({
  selector: 'site-parc-page',
  templateUrl: './site-parc-page.component.html',
  styleUrls: ['./site-parc-page.component.css']
})
export class SiteParcPageComponent implements OnInit {

  constructor() { }

    ngOnInit() {
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
