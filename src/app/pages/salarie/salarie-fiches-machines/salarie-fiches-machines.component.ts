import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {TableSortService} from '../../../services/table-sort.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {MachineClass} from '../../../models/const/machine-class';
declare var $: any;

@Component({
  selector: 'app-salarie-fiches-machines',
  templateUrl: './salarie-fiches-machines.component.html',
  styleUrls: ['./salarie-fiches-machines.component.css'],
  providers: [SalariesService, TableSortService, PaginationService]
})
export class SalarieFichesMachinesComponent implements OnInit, OnDestroy {
  loading = false;
  successUpdate = '';
  errorLoad = '';

  pager: any = {};
  totalItems = 0;
  activePage = 1;
  searchName = '';
  currentPage: any;

  categoryName: string;
  parentCategoryName: string;

  emptyTable = true;
  fichiers = [];
  machine = new MachineClass(0, '', '', '', '', [], false, '', '', 1);

  sortingTarget = '';
  sorting: any = { column: 'type',  descending: false };
  headers: any[] = [
      { display: 'Type',              variable: 'type',  filter: 'text' },
      { display: '№ Parc / Immat.',  variable: 'park_reg', filter: 'text' }
  ];


  constructor(private salariesService: SalariesService,
              private tableSortService: TableSortService,
              private errorMessageHandlerService: ErrorMessageHandlerService,
              private paginationService: PaginationService) { }

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


  public findFichiersByNameFunction(name: string, page: any = 1, sort: string) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.search_name;
    }
    this.activePage = page;

    this.salariesService.findMachinesByName(_name, page, sort)
      .subscribe(result => {
        if (result) {
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


  public voirFunction(machine_id: number) {
    this.cancellMessages();
    this.machine = new MachineClass(0, '', '', '', '', [], false, '', '', 1);
    this.categoryName = '';
    this.parentCategoryName = '';
    this.loading = true;
    this.salariesService.findOneMachine(machine_id)
      .subscribe(result => {
        if (result) {
            this.loading = false;
            console.log(result);
            this.categoryName = result.categoryName;
            this.parentCategoryName = result.parentCategoryName;
            this.machine.mark = result.mark;
            this.machine.model = result.model;
            if (result.parkNumber)    {this.machine.parkNumber = result.parkNumber; }
            if (result.registration)  {this.machine.registration = result.registration; }
            if (result.equipment)     {this.machine.equipment = result.equipment; }
            if (result.remoteControl) {this.machine.remoteControl = result.remoteControl; }
            if (result.techControl)   {this.machine.techControl = result.techControl; }
            if (result.vgp)           {this.machine.vgp = result.vgp; }
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  private cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
    this.successUpdate = '';
  }

}
