import { Route } from '@angular/router';

import { SupportComponent } from './support.component';

export const supportRoute: Route = {
    path: 'support',
    component: SupportComponent,
    data: {
        authorities: [],
        pageTitle: 'support.title'
    }
};
