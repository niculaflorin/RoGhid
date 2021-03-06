import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RatingModule} from "ng2-rating";
import { AgmCoreModule } from '@agm/core';
import { RoGhidSharedModule } from '../../shared';
import {
    ObjectiveService,
    ObjectivePopupService,
    ObjectiveComponent,
    ObjectiveDetailComponent,
    ObjectiveDialogComponent,
    ObjectivePopupComponent,
    ObjectiveDeletePopupComponent,
    ObjectiveDeleteDialogComponent,
    objectiveRoute,
    objectivePopupRoute,
} from './';

const ENTITY_STATES = [
    ...objectiveRoute,
    ...objectivePopupRoute,
];

@NgModule({
    imports: [
        RoGhidSharedModule,
        RatingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCYwWA88TpLG7s3J0AivYirG7B4U2nWD4I'
        }),
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ObjectiveComponent,
        ObjectiveDetailComponent,
        ObjectiveDialogComponent,
        ObjectiveDeleteDialogComponent,
        ObjectivePopupComponent,
        ObjectiveDeletePopupComponent,
    ],
    entryComponents: [
        ObjectiveComponent,
        ObjectiveDialogComponent,
        ObjectivePopupComponent,
        ObjectiveDeleteDialogComponent,
        ObjectiveDeletePopupComponent,
    ],
    providers: [
        ObjectiveService,
        ObjectivePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoGhidObjectiveModule {}
