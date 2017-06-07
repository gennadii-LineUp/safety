import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'adminAccess'
})
export class AdminAccessPipe implements PipeTransform {
    transform(value: boolean, args?: any): string {

        if(value===true) {
            return 'Admin';
        } else {
            return '-';
        }

    }
}