import { Routes } from '@angular/router';

import {
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    setariRoute,
    acasaRoute,
    postsRoute,
    groupsRoute,
    mapsRoute,
    supportRoute,
    socialRegisterRoute,
    socialAuthRoute,
    settingsRoute
} from './';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    setariRoute,
    acasaRoute,
    postsRoute,
    groupsRoute,
    mapsRoute,
    supportRoute,
    socialAuthRoute,
    socialRegisterRoute,
    settingsRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
