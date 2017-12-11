import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { UserGroup } from './user-group.model';
import { UserGroupService } from './user-group.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-group',
    templateUrl: './user-group.component.html'
})
export class UserGroupComponent implements OnInit, OnDestroy {
userGroups: UserGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userGroupService: UserGroupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userGroupService.query().subscribe(
            (res: ResponseWrapper) => {
                this.userGroups = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserGroup) {
        return item.id;
    }
    registerChangeInUserGroups() {
        this.eventSubscriber = this.eventManager.subscribe('userGroupListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
