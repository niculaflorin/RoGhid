import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ObjectiveWishList } from './objective-wish-list.model';
import { ObjectiveWishListService } from './objective-wish-list.service';

@Component({
    selector: 'jhi-objective-wish-list-detail',
    templateUrl: './objective-wish-list-detail.component.html'
})
export class ObjectiveWishListDetailComponent implements OnInit, OnDestroy {

    objectiveWishList: ObjectiveWishList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private objectiveWishListService: ObjectiveWishListService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInObjectiveWishLists();
    }

    load(id) {
        this.objectiveWishListService.find(id).subscribe((objectiveWishList) => {
            this.objectiveWishList = objectiveWishList;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInObjectiveWishLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'objectiveWishListListModification',
            (response) => this.load(this.objectiveWishList.id)
        );
    }
}
