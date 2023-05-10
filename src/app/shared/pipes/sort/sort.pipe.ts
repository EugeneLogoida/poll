import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<string>, args: any[]): any {
    const sortField = args[0];
    let multiplier = 1;
    if(sortField == 'enteredByTimes') multiplier = -1



    value.sort((a: any, b: any) => {
        if(Array.isArray(a[sortField]) &&  Array.isArray(b[sortField])){
          a[sortField] = a[sortField].length;
          b[sortField] = b[sortField].length;

        }
        if (a[sortField] < b[sortField]) {
          return -1 * multiplier
        } else if (a[sortField] > b[sortField]) {
          return 1 * multiplier
        } else {
          return 0;
        }
      }
    );

    return value;
  }



}
