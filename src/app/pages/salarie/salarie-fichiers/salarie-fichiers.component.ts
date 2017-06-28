import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {TableSortService} from '../../../services/table-sort.service';
declare var $:any;

@Component({
  selector: 'app-salarie-fichiers',
  templateUrl: './salarie-fichiers.component.html',
  styleUrls: ['./salarie-fichiers.component.css'],
    providers: [SalariesService, TableSortService]
})
export class SalarieFichiersComponent implements OnInit {
    emptyTable: boolean = true;

    headers: any[] = [
        { display: 'Nom du fichier', variable: 'name', filter: 'text' }
    ];



    constructor(private salariesService: SalariesService,
              private tableSortService: TableSortService) { }

    ngOnInit() {
        this.salariesService.tableMobileViewInit();
    }


///////////////////////////////////////////
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
///////////////////////////////////////////


}
