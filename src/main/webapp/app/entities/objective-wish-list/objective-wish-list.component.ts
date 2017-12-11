import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ObjectiveWishList } from './objective-wish-list.model';
import { ObjectiveWishListService } from './objective-wish-list.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-objective-wish-list',
    templateUrl: './objective-wish-list.component.html'
})
export class ObjectiveWishListComponent implements OnInit, OnDestroy {
objectiveWishLists: ObjectiveWishList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private objectiveWishListService: ObjectiveWishListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.objectiveWishListService.query().subscribe(
            (res: ResponseWrapper) => {
                this.objectiveWishLists = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInObjectiveWishLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ObjectiveWishList) {
        return item.id;
    }
    registerChangeInObjectiveWishLists() {
        this.eventSubscriber = this.eventManager.subscribe('objectiveWishListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
