import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { AgmCoreModule } from '@agm/core';

import { RoGhidSharedModule, UserRouteAccessService } from './shared';
import { RoGhidHomeModule } from './home/home.module';
import { RoGhidAdminModule } from './admin/admin.module';
import { RoGhidAccountModule } from './account/account.module';
import { RoGhidEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    ActiveMenuDirective,
    ErrorComponent,
    SuggestionsComponent
} from './layouts';

import { FilterPipe } from './layouts/suggestions/filter.pipe';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        RoGhidSharedModule,
        RoGhidHomeModule,
        RoGhidAdminModule,
        RoGhidAccountModule,
        RoGhidEntityModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCYwWA88TpLG7s3J0AivYirG7B4U2nWD4I'
        }),
        BrowserModule

        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        ActiveMenuDirective,
        FooterComponent,
        SuggestionsComponent,
        FilterPipe
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]

})
export class RoGhidAppModule {}
