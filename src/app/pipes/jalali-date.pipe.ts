import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-jalaali';
@Pipe({
  name: 'jalaliDate',
  standalone: true
})
export class JalaliDatePipe implements PipeTransform {

  transform(value: any, format: string = 'jYYYY/jMM/jDD'): string {
    if (!value) return '';
    return moment(value).format(format);
  }

}
