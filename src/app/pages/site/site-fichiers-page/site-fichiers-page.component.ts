import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TableSortService} from '../../../services/table-sort.service';
import {ErrorMessageHandlerService} from "../../../services/error/error-message-handler.service";
import {PaginationService} from "../../../services/pagination/pagination.service";

@Component({
  selector: 'site-fichiers-page',
  templateUrl: './site-fichiers-page.component.html',
  styleUrls: ['./site-fichiers-page.component.css'],
    providers: [SiteService, TableSortService, PaginationService]
})
export class SiteFichiersPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    id_site: number;

    fichiers = [];
    pager: any = {};
    totalItems = 0;
    activePage = 1;
    searchName = '';
    currentPage: any;

    sortingTarget = '';
    headers: any[] = [
        { display: 'Nom du fichier',    variable: 'name', filter: 'text' }// ,
        // { display: 'Groupe d’employés', variable: 'sites', filter: 'text' }
    ];
    public getSortingTarget() {
      this.sortingTarget = this.tableSortService._getSortingTarget();
    }

    constructor (private siteService: SiteService,
                 private errorMessageHandlerService: ErrorMessageHandlerService,
                 private paginationService: PaginationService,
                 private tableSortService: TableSortService) {}

    ngOnInit(): void {
        this.id_site = localStorage.id_site;
        this.findFichiersByNameFunction('', 1, '');
        this.siteService.tableMobileViewInit();
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
    }
    ngOnDestroy() {
      localStorage.removeItem('search_name');
      localStorage.removeItem('search_page');
    }

// FichiersClass

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.totalItems, page);
  }


  public onInitChecking() {
    this.searchName = localStorage.search_name;
    this.activePage = +localStorage.search_page;

    if (this.searchName && this.activePage) {
      this.findFichiersByNameFunction(this.searchName, this.activePage + 1, '');
    } else {
      this.findFichiersByNameFunction('', 1, '');
    }
  }


  public findFichiersByNameFunction(name: string, page: any = 1, sort: string) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.search_name;
    }
    this.activePage = page;

    this.siteService.findFichiersByName(_name, page, this.id_site, sort)
      .subscribe(result => {
        if (result) {
          this.loading = false;

          console.log(result);
          this.fichiers = result.items;
          console.log(this.fichiers);
          this.totalItems = +result.pagination.totalCount;
          if (this.totalItems === 0) {
            this.emptyTable = true;
          }
          console.log('ITEMS  ' + this.totalItems);
          this.currentPage = +result.pagination.current;

          this.setPage(this.currentPage);

          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 200);
          localStorage.setItem('search_name', _name);
          localStorage.setItem('search_page', this.currentPage);
        }
      }, (err) => {
        this.loading = false;
        this.emptyTable = true;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public deleteFunction(id_itemForDelete: number) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    this.siteService.deleteEmployee(this.id_site, id_itemForDelete)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.findFichiersByNameFunction(this.searchName, this.activePage, '');
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public cancellMessages() {
    this.loading = false;
    this.successCreating = '';
    this.errorLoad = '';
    this.errorCreating = '';
  }

}
