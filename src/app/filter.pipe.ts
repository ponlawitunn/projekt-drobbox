import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(entries: any, term: any): any {
    //check if search term is undefined
    if (term === undefined) return entries;
    // return updated entries array
    return entries.filter(function(entri){
      return entri.name.toLowerCase().includes(term.toLowerCase());
    })
  }

}
