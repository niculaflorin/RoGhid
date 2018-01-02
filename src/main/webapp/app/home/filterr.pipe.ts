import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})
export class SearchFilter implements PipeTransform {
    transform(items: any[], term: number): any {
        if (!items) {
            return [];
        }
        if (!term) {
            return items;
        }
            return items.filter((item) => item.city.id === term);
    }
}
