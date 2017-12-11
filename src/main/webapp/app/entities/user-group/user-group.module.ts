import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoGhidSharedModule } from '../../shared';
import {
    UserGroupService,
    UserGroupPopupService,
    UserGroupComponent,
    UserGroupDetailComponent,
    UserGroupDialogComponent,
    UserGroupPopupComponent,
    UserGroupDeletePopupComponent,
    UserGroupDeleteDialogComponent,
    userGroupRoute,
    userGroupPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userGroupRoute,
    ...userGroupPopupRoute,
];

@NgModule({
    imports: [
        RoGhidSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserGroupComponent,
        UserGroupDetailComponent,
        UserGroupDialogComponent,
        UserGroupDeleteDialogComponent,
        UserGroupPopupComponent,
        UserGroupDeletePopupComponent,
    ],
    entryComponents: [
        UserGroupComponent,
        UserGroupDialogComponent,
        UserGroupPopupComponent,
        UserGroupDeleteDialogComponent,
        UserGroupDeletePopupComponent,
    ],
    providers: [
        UserGroupService,
        UserGroupPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoGhidUserGroupModule {}
