import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EditRequest } from './edit-request.model';
import { EditRequestService } from './edit-request.service';

@Component({
    selector: 'jhi-edit-request-detail',
    templateUrl: './edit-request-detail.component.html'
})
export class EditRequestDetailComponent implements OnInit, OnDestroy {

    editRequest: EditRequest;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private editRequestService: EditRequestService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEditRequests();
    }

    load(id) {
        this.editRequestService.find(id).subscribe((editRequest) => {
            this.editRequest = editRequest;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEditRequests() {
        this.eventSubscriber = this.eventManager.subscribe(
            'editRequestListModification',
            (response) => this.load(this.editRequest.id)
        );
    }
}
