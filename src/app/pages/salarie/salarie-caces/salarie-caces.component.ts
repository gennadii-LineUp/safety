import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';
import {TableSortService} from '../../../services/table-sort.service';
import {PaginationService} from '../../../services/pagination/pagination.service';

@Component({
  selector: 'app-salarie-caces',
  templateUrl: './salarie-caces.component.html',
  styleUrls: ['./salarie-caces.component.css'],
    providers: [SalariesService, TableSortService, PaginationService, BackendService]
})
export class SalarieCacesComponent extends BasePageComponent implements OnInit, OnDestroy {
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
    { display: 'Nom', variable: 'name', filter: 'text' },
    { display: 'Date d’expiration', variable: 'expires',  filter: 'text' }
  ];

  constructor(public salariesService: SalariesService,
              public tableSortService: TableSortService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public paginationService: PaginationService,
              public backendService: BackendService) { super(); }


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

  public findFichiersByNameFunction(name: string, page: any = 1, sort: string) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.search_name;
    }
    this.activePage = page;

    this.doRequest(this.salariesService, 'findCacesByName', [_name, page, sort], result => {
      this.loading = false;
      this.fichiers = result.items;

      this.totalItems = +result.pagination.totalCount;
      if (this.totalItems === 0) {
        this.emptyTable = true;
      }
      this.currentPage = +result.pagination.current;
      this.setPage(this.currentPage);

      setTimeout(() => {
        this.salariesService.tableMobileViewInit();
      }, 100);
      localStorage.setItem('search_name', _name);
      localStorage.setItem('search_page', this.currentPage);
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

  public getFromServerLinkForPDFFunction(fileLink: string) {
    this.doRequest(this.salariesService, 'getFromServerLinkForPDF_', [fileLink], result => {
      this.loading = false;
      window.open(result.url, '_blank');
    }, (err) => {
      console.log(err);
      this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
    });
  }

  public voirFunction(fichierId: number) {
    this.cancellMessages();
    this.loading = true;
    this.doRequest(this.salariesService, 'getFromServerCacesImage', [fichierId], result => {
      if (result.fileLinkId) {this.getFromServerLinkForPDFFunction(result.fileLinkId); }
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
