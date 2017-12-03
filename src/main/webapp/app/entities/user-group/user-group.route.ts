import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserGroupComponent } from './user-group.component';
import { UserGroupDetailComponent } from './user-group-detail.component';
import { UserGroupPopupComponent } from './user-group-dialog.component';
import { UserGroupDeletePopupComponent } from './user-group-delete-dialog.component';

export const userGroupRoute: Routes = [
    {
        path: 'user-group',
        component: UserGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.userGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-group/:id',
        component: UserGroupDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.userGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userGroupPopupRoute: Routes = [
    {
        path: 'user-group-new',
        component: UserGroupPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.userGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-group/:id/edit',
        component: UserGroupPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.userGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-group/:id/delete',
        component: UserGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.userGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
