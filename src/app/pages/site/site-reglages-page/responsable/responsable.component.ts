import { Component, OnInit } from '@angular/core';
import {TableSortService} from '../../../../services/table-sort.service';
import {SiteService} from '../../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';

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

    id_site: number;

    employee_search = [];

    headers: any[] = [
        { display: 'Nom du salarié', variable: 'name',    filter: 'text' },
        { display: 'Accès',          variable: 'access',  filter: 'text' },
    ];
    mobileHeaders: any[] = [
          { display: 'Nom',       variable: 'name',    filter: 'text' },
          { display: 'n° Sécu',   variable: 'nsecu',  filter: 'text' },
      ];


    constructor(private siteService: SiteService,
                private tableSortService: TableSortService,
                private errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
      this.id_site = localStorage.id_site;
      this.siteService.tableMobileViewInit();
  }

  public findEmployeeByName_searchFunction(name: string, page: any = 1, sort: string) {
    this.setEmptyData();
    this.loading = true;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.siteEmployeeSearch_name;
    }
    this.siteService.findEmployeeByName(_name, page, this.id_site, sort)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.employee_search = result.items;
          this.loaded = true;
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public setEmptyData() {
    this.loaded = false;
    this.cancellMessages();
    return true;
  }
  private cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
    this.errorCreating = '';
  }

}
