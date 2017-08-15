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
    totalItems = 0;
    activePage = 1;
    searchName = '';
    currentPage: any;

  constructor(public paginationService: PaginationService) { }

  ngOnInit() {}

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.totalItems, page);
    }


}
