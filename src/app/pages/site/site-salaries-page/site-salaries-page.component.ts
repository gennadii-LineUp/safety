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

    constructor(private siteService: SiteService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private paginationService: PaginationService,
                private router: Router) { }

  ngOnInit() {
  }

    gotoNewSalariesForm() {
        this.router.navigate(['/site/salaries/ajouter-un-salaries-etap1']);
    }


}
