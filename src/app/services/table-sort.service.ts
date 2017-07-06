import { Injectable } from '@angular/core';

@Injectable()
export class TableSortService {
    sortingTarget: string = '';

    sorting: any = { column: 'name',  descending: false };

    public selectedClass(columnName): string{
        return columnName == this.sorting.column ? 'sort-button-' + this.sorting.descending : 'double-sort-button';
    }        //    access = (age > 14) ? true : false;

    public changeSorting(columnName): void{
        console.log(columnName);
        var sort = this.sorting;
        if (sort.column == columnName) {
            sort.descending = !sort.descending;
        } else {
            sort.column = columnName;
            sort.descending = false;
        }
    }


    public _changeSorting(columnName:string, e:any): void{
        let sortingDirection: string;
        let thClass: string;
        console.log(columnName);

        var sort = this.sorting;
        if (sort.column == columnName) {
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

        this.sortingTarget = '&sort=' + sortingDirection + columnName;
        console.log(this.sortingTarget);
    }

    public _getSortingTarget():string {
        return this.sortingTarget;
    }
// ///////////////////////////////////////////////////////////////////////////////////////////
//     public sortingTarget: string;
//
//     _sorting: any;
//     sortingCompany: any = { column: 'company',  descending: false };
//
//
//     public _selectedClass(columnName, firstColumn:string): string{
//         return columnName == this._sorting.column ? 'sort-button-' + this._sorting.descending : 'double-sort-button';
//     }
//
//     public _changeSorting(columnName:string, firstColumn:string, e:any): string{
//         if (firstColumn === 'company') {
//             this._sorting = this.sortingCompany;
//         }
//
//         let sortingDirection: string;
//         let thClass: string;
//
//
//         var sort = this._sorting;
//         if (sort.column == columnName) {
//             sort.descending = !sort.descending;
//         } else {
//             sort.column = columnName;
//             sort.descending = false;
//         }
//
//         if (e.target.firstElementChild) {
//             thClass = e.target.firstElementChild.className;
//         } else {
//             thClass = e.target.className;
//         }
//         if ((thClass === 'double-sort-button') || (thClass === 'sort-button-true')) {
//             sortingDirection = '';  // down
//         }
//         if (thClass === 'sort-button-false') {
//             sortingDirection = '-'; // up
//         }
//
// //                ?q=&sort=-groupName&page=1
//         this.sortingTarget = '&sort=' + sortingDirection + columnName;
//         console.log(this.sortingTarget);
//         return this.sortingTarget;
//     }

}