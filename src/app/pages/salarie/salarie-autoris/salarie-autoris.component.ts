import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableSortService} from '../../../services/table-sort.service';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
declare var $: any;

@Component({
  selector: 'app-salarie-autoris',
  templateUrl: './salarie-autoris.component.html',
  styleUrls: ['./salarie-autoris.component.css'],
  providers: [SalariesService, TableSortService, PaginationService]
})
export class SalarieAutorisComponent implements OnInit, OnDestroy {
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
  sorting: any = { column: 'type', descending: false };
  headers: any[] = [
    { display: 'Type', variable: 'type', filter: 'text' }
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

  public selectedClass(columnName): string {
    return columnName === this.sorting.column ? 'sort-button-' + this.sorting.descending : 'double-sort-button';
  }
  public changeSorting(columnName: string, e: any): void {
    let sortingDirection: string;
    let thClass: string;

    const sort = this.sorting;
    if (sort.column === columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }

    if (e.target.firstElementChild) {
      thClass = e.target.firstElementChild.className;
    } else {
      thClass = e.target.className;
    }
    if ((thClass === 'double-sort-button') || (thClass === 'sort-button-true')) {
      sortingDirection = '';  // down
    }
    if (thClass === 'sort-button-false') {
      sortingDirection = '-'; // up
    }

    // let input_findClientByName = window.document.getElementsByClassName('search-input')['0'].value;
    this.sortingTarget = '&sort=' + sortingDirection + columnName;
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

    this.salariesService.findDriving_licensesByName(_name, page, sort)
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
    this.cancellMessages();
    this.loading = true;
    this.salariesService.getFromServerDriving_licenseImage(fichierId)
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.loading = false;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
    this.successUpdate = '';
  }

}
