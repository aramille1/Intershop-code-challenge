import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storesFilter'
})
export class StoresFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.country.toLocaleLowerCase().includes(searchText);
    });
  }

}
