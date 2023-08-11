import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: [any], sSearchPair: string): any[] {
    if (!items) {
      return [];
    }
    if (!sSearchPair) {
      return items;
    }
    sSearchPair = sSearchPair.toLocaleLowerCase();
    return items.filter((it: any) => {
      if (it.sSurname) {
        return it.sSurname.toLocaleLowerCase().indexOf(sSearchPair) !== -1;
      }else if (it) {
        return it.toLocaleLowerCase().includes(sSearchPair);
      }
    });
  }
}
