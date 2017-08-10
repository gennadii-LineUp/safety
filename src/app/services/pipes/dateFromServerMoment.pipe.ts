import { Pipe, PipeTransform } from '@angular/core';
import {DataService} from '../DataService.service';

@Pipe({
  name: 'dateFromServerMoment'
})
export class DateFromServerMomentPipe implements PipeTransform {

  constructor(public dataService: DataService) {}

  transform(value: any) {
    if (value) {
      return this.dataService.fromServerMoment(value);
    }
    return value;
  }

}
