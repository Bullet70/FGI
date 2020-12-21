import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {
  transform(value, multiplier) : any {
    multiplier = multiplier || 1;

    let res = [];
    for (let i = 0; i < value; i++) {
      for (let j = 0; j < multiplier; j++) {
        res.push(i);
      }
    }

    return res;
  }
}
