import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ObjectiveComponent } from './objective.component';
import { ObjectiveDetailComponent } from './objective-detail.component';
import { ObjectivePopupComponent } from './objective-dialog.component';
import { ObjectiveDeletePopupComponent } from './objective-delete-dialog.component';

export const objectiveRoute: Routes = [
    {
        path: 'objective',
        component: ObjectiveComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objective.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'objective/:id',
        component: ObjectiveDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objective.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const objectivePopupRoute: Routes = [
    {
        path: 'objective-new',
        component: ObjectivePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objective.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'objective/:id/edit',
        component: ObjectivePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objective.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'objective/:id/delete',
        component: ObjectiveDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'roGhidApp.objective.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
