import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {TableSortService} from '../../../services/table-sort.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
declare var $: any;

@Component({
  selector: 'app-salarie-fichiers',
  templateUrl: './salarie-fichiers.component.html',
  styleUrls: ['./salarie-fichiers.component.css'],
    providers: [SalariesService, TableSortService, PaginationService]
})
export class SalarieFichiersComponent implements OnInit, OnDestroy {
  loading = false;
  successUpdate = '';
  errorLoad = '';

  pager: any = {};
  totalItems = 0;
  activePage = 1;
  searchName = '';
  currentPage: any;

  emptyTable = true;
  fichiers = [];

  sortingTarget = '';
  headers: any[] = [
    { display: 'Nom du fichier',    variable: 'name', filter: 'text' }// ,
    // { display: 'Groupe d’employés', variable: 'sites', filter: 'text' }
  ];


    constructor(public salariesService: SalariesService,
                public tableSortService: TableSortService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public paginationService: PaginationService) { }

    ngOnInit() {
        this.findFichiersByNameFunction('', 1, '');
    }
    ngOnDestroy() {
      localStorage.removeItem('search_name');
      localStorage.removeItem('search_page');
    }

  public getSortingTarget() {
    this.sortingTarget = this.tableSortService._getSortingTarget();
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

    this.salariesService.findFichiersByName(_name, page, sort)
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.loading = false;
          console.log(result);
          this.fichiers = result.items;

          this.totalItems = +result.pagination.totalCount;
          if (this.totalItems === 0) {
            this.emptyTable = true;
          }
          console.log('ITEMS  ' + this.totalItems);
          this.currentPage = +result.pagination.current;

          this.setPage(this.currentPage);

          setTimeout(() => {
            this.salariesService.tableMobileViewInit();
          }, 100);
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

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.totalItems, page);
  }

  public voirFunction(fichierId: number) {
      console.log(fichierId);
  }

  public cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
    this.successUpdate = '';
  }

}
