import { Route } from '@angular/router';

import { GroupsComponent } from './groups.component';

export const groupsRoute: Route = {
    path: 'groups',
    component: GroupsComponent,
    data: {
        authorities: [],
        pageTitle: 'groups.title'
    }
};
