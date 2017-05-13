import {Injectable} from "@angular/core";
import {ProgressBarTESTclass} from '../models/const/progress-bar-test-class';
import {ProgressBarTESTvalues} from '../models/const/progress-bar-test-data';

@Injectable()
export class ProgressBarFillService{

    get(): Promise<ProgressBarTESTclass[]> {
        return Promise.resolve(ProgressBarTESTvalues);
    }

    getDataById(id: number): Promise<ProgressBarTESTclass> {
        return this.get()
            .then(ProgressBarTESTvalues => ProgressBarTESTvalues.find(category => category.id === id));
    }

    add(id: number, name: string, value: number) {
        ProgressBarTESTvalues.push(new ProgressBarTESTclass(id, name, value));
    }


    delete(data: ProgressBarTESTclass) {
        //HERO.splice(HERO.findIndex(hero)), 1);
        for (let i=0; i<ProgressBarTESTvalues.length; i++) {
            if (ProgressBarTESTvalues[i]===data) {
                ProgressBarTESTvalues.splice(i, 1);
            }
        }
    }

}