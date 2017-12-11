import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoGhidSharedModule } from '../../shared';
import {
    EditRequestService,
    EditRequestPopupService,
    EditRequestComponent,
    EditRequestDetailComponent,
    EditRequestDialogComponent,
    EditRequestPopupComponent,
    EditRequestDeletePopupComponent,
    EditRequestDeleteDialogComponent,
    editRequestRoute,
    editRequestPopupRoute,
} from './';

const ENTITY_STATES = [
    ...editRequestRoute,
    ...editRequestPopupRoute,
];

@NgModule({
    imports: [
        RoGhidSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EditRequestComponent,
        EditRequestDetailComponent,
        EditRequestDialogComponent,
        EditRequestDeleteDialogComponent,
        EditRequestPopupComponent,
        EditRequestDeletePopupComponent,
    ],
    entryComponents: [
        EditRequestComponent,
        EditRequestDialogComponent,
        EditRequestPopupComponent,
        EditRequestDeleteDialogComponent,
        EditRequestDeletePopupComponent,
    ],
    providers: [
        EditRequestService,
        EditRequestPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoGhidEditRequestModule {}
