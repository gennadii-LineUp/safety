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
    chariotsElevateurs: boolean = true;
    gruesMobiles: boolean = false;

    Type = [
        { value: 'chariotsElevateurs', display: 'Chariots élévateurs R.389' },
        { value: 'gruesMobiles', display: 'Grues mobiles R.383m' }
    ];

    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) { }

    ngOnInit() {
        this.tableMobileViewInit();

        //Datepicker Popups calender to Choose date
        $(function(){
            $( "#datepicker1, #datepicker2, #datepicker3, #datepicker4, #datepicker5" ).datepicker();
            //Pass the user selected date format
            $( "#format" ).change(function() {
                $( "#datepicker1, #datepicker2, #datepicker3, #datepicker4, #datepicker5" ).datepicker( "option", "dateFormat", $(this).val() );
            });
        });
    }

    public ShowType(userChoice:string) {
        if (userChoice === "gruesMobiles") {
            this.chariotsElevateurs = false;
            this.gruesMobiles = true;
        } else {
            this.gruesMobiles = false;
            this.chariotsElevateurs = true;
        }
        console.log(userChoice);

    }

    gotoSalariesPage() {
        this.router.navigate(['/site/salarie']);
    }

    public tableMobileViewInit() {
        let headertext = [],
            headers = document.querySelectorAll("th"),
            tablerows = document.querySelectorAll("th"),
            tablebody = document.querySelector("tbody");
        if (document.querySelector("table")) {
            for(let i = 0; i < headers.length; i++) {
                let current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/,""));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute("data-th", headertext[j]);
                }
            }
        }
    }


}
