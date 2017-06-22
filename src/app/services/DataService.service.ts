import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DataService {
    private dataObs$ = new Subject();

    getData() {
        return this.dataObs$;
    }

    updateData(data: number) {
        this.dataObs$.next(data);
    }
}