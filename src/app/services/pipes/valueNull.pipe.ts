import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueNull'
})
export class ValueNullPipe implements PipeTransform {
  transform(value: any, args?: any): string {

    if (value === null) {
      return '-';
    } else {
      return value;
    }
  }
}
