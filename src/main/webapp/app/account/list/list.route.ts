import { Route } from '@angular/router';

import { ListComponent } from './list.component';

export const listRoute: Route = {
    path: 'list',
    component: ListComponent,
    data: {
        authorities: [],
        pageTitle: 'list.title'
    }
};
