import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsableSite'
})
export class ResponsableSitePipe implements PipeTransform {
  transform(value: boolean, args?: any): string {

    if (+value === 1) {
      return 'General';
    } else if (+value === 0) {
      return 'Technique';
    } else {
      return '-';
    }
  }
}
