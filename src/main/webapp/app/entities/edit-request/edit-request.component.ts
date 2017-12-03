import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EditRequest } from './edit-request.model';
import { EditRequestService } from './edit-request.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-edit-request',
    templateUrl: './edit-request.component.html'
})
export class EditRequestComponent implements OnInit, OnDestroy {
editRequests: EditRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private editRequestService: EditRequestService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.editRequestService.query().subscribe(
            (res: ResponseWrapper) => {
                this.editRequests = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEditRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EditRequest) {
        return item.id;
    }
    registerChangeInEditRequests() {
        this.eventSubscriber = this.eventManager.subscribe('editRequestListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
