import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoGhidSharedModule } from '../../shared';
import {
    ObjectiveWishListService,
    ObjectiveWishListPopupService,
    ObjectiveWishListComponent,
    ObjectiveWishListDetailComponent,
    ObjectiveWishListDialogComponent,
    ObjectiveWishListPopupComponent,
    ObjectiveWishListDeletePopupComponent,
    ObjectiveWishListDeleteDialogComponent,
    objectiveWishListRoute,
    objectiveWishListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...objectiveWishListRoute,
    ...objectiveWishListPopupRoute,
];

@NgModule({
    imports: [
        RoGhidSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ObjectiveWishListComponent,
        ObjectiveWishListDetailComponent,
        ObjectiveWishListDialogComponent,
        ObjectiveWishListDeleteDialogComponent,
        ObjectiveWishListPopupComponent,
        ObjectiveWishListDeletePopupComponent,
    ],
    entryComponents: [
        ObjectiveWishListComponent,
        ObjectiveWishListDialogComponent,
        ObjectiveWishListPopupComponent,
        ObjectiveWishListDeleteDialogComponent,
        ObjectiveWishListDeletePopupComponent,
    ],
    providers: [
        ObjectiveWishListService,
        ObjectiveWishListPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoGhidObjectiveWishListModule {}
