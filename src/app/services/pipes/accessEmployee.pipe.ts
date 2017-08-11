import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeAccess'
})
export class EmployeeAccessPipe implements PipeTransform {
  transform(value: any, args?: any): string {

    if (value === 0) {
      return 'Technique';
    } else if (value === 1) {
      return 'Général';
    } else if (value === null) {
      return '-';
    } else {
      return value;
    }

  }
}
