import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoGhidUserAccountModule } from './user-account/user-account.module';
import { RoGhidObjectiveModule } from './objective/objective.module';
import { RoGhidRatingModule } from './rating/rating.module';
import { RoGhidCommentModule } from './comment/comment.module';
import { RoGhidCityModule } from './city/city.module';
import { RoGhidRegionModule } from './region/region.module';
import { RoGhidEditRequestModule } from './edit-request/edit-request.module';
import { RoGhidObjectiveWishListModule } from './objective-wish-list/objective-wish-list.module';
import { RoGhidUserGroupModule } from './user-group/user-group.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RoGhidUserAccountModule,
        RoGhidObjectiveModule,
        RoGhidRatingModule,
        RoGhidCommentModule,
        RoGhidCityModule,
        RoGhidRegionModule,
        RoGhidEditRequestModule,
        RoGhidObjectiveWishListModule,
        RoGhidUserGroupModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoGhidEntityModule {}
