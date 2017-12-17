import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term: number, cr: number): any {
        if (!items) {
            return [];
        }
        if (!term) {
            return items;
        }
        if (cr = 0) {
            return items;
        }
        if (cr = 1) {
            return items.filter((item) => item.city.id = term);
        }
        if (cr = 2) {
            return items.filter((item) => item.city.region.id = term);
        }
}
}
