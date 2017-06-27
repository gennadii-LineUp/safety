import { Component, OnInit } from '@angular/core';
import {TableSortService} from '../../../services/table-sort.service';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-bibliotheque-page',
  templateUrl: './admin-bibliotheque-page.component.html',
  styleUrls: ['./admin-bibliotheque-page.component.css'],
    providers: [ AdminService, TableSortService]
})
export class AdminBibliothequePageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = true;
    errorLoad: string = '';

    headers: any[] = [
        { display: 'Nom',  variable: 'name',  filter: 'text' },
        { display: 'Lien', variable: 'lien',  filter: 'text' }
    ];

    constructor(private adminService: AdminService,
                private tableSortService: TableSortService) { }

    ngOnInit() {
        this.adminService.tableMobileViewInit();
    }

//////////////////////////////////////
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
/////////////////////////////////////////////




    private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

}
