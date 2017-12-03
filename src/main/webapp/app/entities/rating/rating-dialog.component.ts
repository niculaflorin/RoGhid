import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Rating } from './rating.model';
import { RatingPopupService } from './rating-popup.service';
import { RatingService } from './rating.service';
import { Objective, ObjectiveService } from '../objective';
import { UserAccount, UserAccountService } from '../user-account';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rating-dialog',
    templateUrl: './rating-dialog.component.html'
})
export class RatingDialogComponent implements OnInit {

    rating: Rating;
    isSaving: boolean;

    objectives: Objective[];

    useraccounts: UserAccount[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ratingService: RatingService,
        private objectiveService: ObjectiveService,
        private userAccountService: UserAccountService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.objectiveService.query()
            .subscribe((res: ResponseWrapper) => { this.objectives = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userAccountService.query()
            .subscribe((res: ResponseWrapper) => { this.useraccounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rating.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ratingService.update(this.rating));
        } else {
            this.subscribeToSaveResponse(
                this.ratingService.create(this.rating));
        }
    }

    private subscribeToSaveResponse(result: Observable<Rating>) {
        result.subscribe((res: Rating) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Rating) {
        this.eventManager.broadcast({ name: 'ratingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackObjectiveById(index: number, item: Objective) {
        return item.id;
    }

    trackUserAccountById(index: number, item: UserAccount) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rating-popup',
    template: ''
})
export class RatingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratingPopupService: RatingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ratingPopupService
                    .open(RatingDialogComponent as Component, params['id']);
            } else {
                this.ratingPopupService
                    .open(RatingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
