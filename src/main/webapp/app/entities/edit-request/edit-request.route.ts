import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EditRequestComponent } from './edit-request.component';
import { EditRequestDetailComponent } from './edit-request-detail.component';
import { EditRequestPopupComponent } from './edit-request-dialog.component';
import { EditRequestDeletePopupComponent } from './edit-request-delete-dialog.component';

export const editRequestRoute: Routes = [
    {
        path: 'edit-request',
        component: EditRequestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.editRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'edit-request/:id',
        component: EditRequestDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.editRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const editRequestPopupRoute: Routes = [
    {
        path: 'edit-request-new',
        component: EditRequestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.editRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'edit-request/:id/edit',
        component: EditRequestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.editRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'edit-request/:id/delete',
        component: EditRequestDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.editRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
