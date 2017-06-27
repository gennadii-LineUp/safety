import { Injectable } from '@angular/core';

@Injectable()
export class TableSortService {

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



}