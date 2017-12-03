import { Route } from '@angular/router';

import { SetariComponent } from './setari.component';

export const setariRoute: Route = {
    path: 'setari',
    component: SetariComponent,
    data: {
        authorities: [],
        pageTitle: 'setari.title'
    }
};
