import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'validityPeriod'
})
export class ValidityPeriodPipe implements PipeTransform {
    transform(value: boolean, args?: any): string {

        if(value===true) {
            return 'Déterminée';
        } else {
            return 'Indéterminée';
        }

    }
}