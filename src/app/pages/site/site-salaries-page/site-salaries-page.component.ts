import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';
import {SiteService} from '../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';

@Component({
  selector: 'site-salaries-page',
  templateUrl: './site-salaries-page.component.html',
  styleUrls: ['./site-salaries-page.component.css'],
    providers: [SiteService, ErrorMessageHandlerService, PaginationService]
})
export class SiteSalariesPageComponent implements OnInit {
    id_site: number = 0;

    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private paginationService: PaginationService,
                private router: Router) { }

    ngOnInit() {
        this.id_site = this.siteService.getIdSite();
        console.log(this.id_site);

        if (!this.id_site) {
            this.id_site = localStorage.id_site;
            console.log('from LS = '+this.id_site);
        }

        this.tableMobileViewInit();
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

    gotoNewSalariesForm() {
        this.router.navigate(['/site/salarie/ajouter-un-salarie-etap1']);
    }


}
