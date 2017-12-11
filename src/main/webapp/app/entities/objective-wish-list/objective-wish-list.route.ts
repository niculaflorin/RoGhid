import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ObjectiveWishListComponent } from './objective-wish-list.component';
import { ObjectiveWishListDetailComponent } from './objective-wish-list-detail.component';
import { ObjectiveWishListPopupComponent } from './objective-wish-list-dialog.component';
import { ObjectiveWishListDeletePopupComponent } from './objective-wish-list-delete-dialog.component';

export const objectiveWishListRoute: Routes = [
    {
        path: 'objective-wish-list',
        component: ObjectiveWishListComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objectiveWishList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'objective-wish-list/:id',
        component: ObjectiveWishListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objectiveWishList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const objectiveWishListPopupRoute: Routes = [
    {
        path: 'objective-wish-list-new',
        component: ObjectiveWishListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objectiveWishList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'objective-wish-list/:id/edit',
        component: ObjectiveWishListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objectiveWishList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'objective-wish-list/:id/delete',
        component: ObjectiveWishListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objectiveWishList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
