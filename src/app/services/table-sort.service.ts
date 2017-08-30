import { Injectable } from '@angular/core';

@Injectable()
export class TableSortService {
    sortingTarget = '';
    sortingTargetSecondName = '';

    sorting: any = { column: 'name',  descending: false };
    sortingSecondName: any = { column: 'name',  descending: false };
    sortingThirdName: any = { column: 'name',  descending: false };

    public selectedClass(columnName): string {
        return columnName === this.sorting.column ? 'sort-button-' + this.sorting.descending : 'double-sort-button';
    }        //    access = (age > 14) ? true : false;
    public selectedClassSecondName(columnName): string {
        return columnName === this.sortingSecondName.column ? 'sort-button-' + this.sortingSecondName.descending : 'double-sort-button';
    }
    public selectedClassThirdName(columnName): string {
      return columnName === this.sortingThirdName.column ? 'sort-button-' + this.sortingThirdName.descending : 'double-sort-button';
    }

    public changeSorting(columnName): void {
        const sort = this.sorting;
        if (sort.column === columnName) {
            sort.descending = !sort.descending;
        } else {
            sort.column = columnName;
            sort.descending = false;
        }
    }
    // public changeSortingSecondName(columnName): void {
    //     const sort = this.sortingSecondName;
    //     if (sort.column === columnName) {
    //       sort.descending = !sort.descending;
    //     } else {
    //       sort.column = columnName;
    //       sort.descending = false;
    //     }
    // }
    // public changeSortingThirdName(columnName): void {
    //   const sort = this.sortingThirdName;
    //   if (sort.column === columnName) {
    //     sort.descending = !sort.descending;
    //   } else {
    //     sort.column = columnName;
    //     sort.descending = false;
    //   }
    // }


    public _changeSorting(columnName: string, e: any): void {
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
        this.sortingTarget = '&sort=' + sortingDirection + columnName;
    }

    public _changeSortingSecondName(columnName: string, e: any): void {
        let sortingDirection: string;
        let thClass: string;

        const sort = this.sortingSecondName;
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
        this.sortingTargetSecondName = '&sort=' + sortingDirection + columnName;
    }

    public _getSortingTarget(): string {
        return this.sortingTarget;
    }
    public _getSortingTargetSecondName(): string {
        return this.sortingTargetSecondName;
    }

}
