import { Route } from '@angular/router';

import { PostsComponent } from './posts.component';

export const postsRoute: Route = {
    path: 'posts',
    component: PostsComponent,
    data: {
        authorities: [],
        pageTitle: 'posts.title'
    }
};
