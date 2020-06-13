/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
 */
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(
    list: any[],
    direction: 'asc' | 'desc' | '',
    propertyName: string
  ): any[] {
    if (!list) {
      return list;
    }
    if (!propertyName) {
      if (!direction || direction === 'asc') {
        return list.sort();
      } else {
        return list.sort().reverse();
      }
    }
    return orderBy(list, [propertyName], [direction]);
  }
}
