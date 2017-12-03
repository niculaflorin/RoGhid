import { Route } from '@angular/router';

import { AcasaComponent } from './acasa.component';

export const acasaRoute: Route = {
    path: 'acasa',
    component: AcasaComponent,
    data: {
        authorities: [],
        pageTitle: 'acasa.title'
    }
};
