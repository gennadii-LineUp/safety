import { Component, OnInit } from '@angular/core';
import {TableSortService} from '../../../services/table-sort.service';
import {SalariesService} from '../../../services/salaries/salaries.service';
//declare var $:any;

@Component({
  selector: 'app-salarie-autoris',
  templateUrl: './salarie-autoris.component.html',
  styleUrls: ['./salarie-autoris.component.css'],
    providers: [SalariesService, TableSortService]
})
export class SalarieAutorisComponent implements OnInit {
    emptyTable = true;

    headers: any[] = [
        { display: 'Type', variable: 'name', filter: 'text' }
    ];


    constructor(private salariesService: SalariesService,
                private tableSortService: TableSortService) { }


    ngOnInit() {
        this.salariesService.tableMobileViewInit();
    }

//////////////////////////////////////////////////////
//     this.emptyTable = false;
//
// * .subscribe(result => {
//     *     if (result) {
//
//         if (this.totalItems === 0) {
//             this.emptyTable = true;
//         }
//
//     * }, (err) => {
//
//     this.emptyTable = true;
//////////////////////////////////////////////////////


}
