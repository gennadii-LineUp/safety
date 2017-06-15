import * as _ from 'underscore';

export class PaginationService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage: number, endPage: number;
        let hiddenAtStart: boolean = false, hiddenAtEnd: boolean = false;
        let simplePagination: boolean;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
            simplePagination = true;
        }
        else if ((totalPages >= 4) && ((totalPages <= 5))) { //10
                simplePagination = false;
            startPage = 2;
            endPage = totalPages-1;
        } else {
           simplePagination  = false;
            if (currentPage <= 4) {//6
                startPage = 2;
                endPage = 4;//10
                hiddenAtStart = false;
                hiddenAtEnd = true;
            } else if ((currentPage>=5) && (currentPage + 3 < totalPages)) {//10
                startPage = currentPage-1 ;//- 5;
                endPage = currentPage + 2;
                hiddenAtStart = true;
                hiddenAtEnd = true;
            } else if (currentPage + 3 >= totalPages) {
                startPage = totalPages - 3;//9
                endPage = totalPages-1;
                hiddenAtStart = true;
                hiddenAtEnd = false;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = _.range(startPage, endPage + 1);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages,
            hiddenAtStart: hiddenAtStart,
            hiddenAtEnd: hiddenAtEnd,
            simplePagination: simplePagination
        };
    }
}