import { Component, OnInit } from '@angular/core';
import {PaginationService} from '../../services/pagination/pagination.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
    providers: [ PaginationService ]
})
export class PaginationComponent implements OnInit {
    data = [];
    pager: any = {};
    totalItems: number = 0;
    activePage: number = 1;
    searchName: string = '';
    currentPage: any;

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
  }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


    // this.data = result.items;  // EXAMPLE:  [{ address:"ff", id:23, name:"ds"} ]
    // this.totalItems = +result.pagination.totalCount;
    // console.log('ITEMS  ' + this.totalItems);
    // this.currentPage = +result.pagination.current;
    //
    // this.setPage(this.currentPage);



}
