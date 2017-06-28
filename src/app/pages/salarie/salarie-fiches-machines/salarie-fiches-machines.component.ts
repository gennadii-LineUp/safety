import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {TableSortService} from '../../../services/table-sort.service';
declare var $:any;

@Component({
  selector: 'app-salarie-fiches-machines',
  templateUrl: './salarie-fiches-machines.component.html',
  styleUrls: ['./salarie-fiches-machines.component.css'],
    providers: [SalariesService, TableSortService]
})
export class SalarieFichesMachinesComponent implements OnInit {
    emptyTable: boolean = true;

    headers: any[] = [
        { display: 'Type',              variable: 'name',  filter: 'text' },
        { display: '№ Parc / Immat.',  variable: 'sites', filter: 'text' }
    ];



    constructor(private salariesService: SalariesService,
                private tableSortService: TableSortService) { }

    ngOnInit() {
        this.salariesService.tableMobileViewInit();
    }

////////////////////////////////////
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
//
////////////////////////////////////


}
