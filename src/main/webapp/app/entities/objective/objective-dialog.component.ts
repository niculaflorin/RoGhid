import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Objective } from './objective.model';
import { ObjectivePopupService } from './objective-popup.service';
import { ObjectiveService } from './objective.service';
import { UserAccount, UserAccountService } from '../user-account';
import { City, CityService } from '../city';
import { ObjectiveWishList, ObjectiveWishListService } from '../objective-wish-list';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-objective-dialog',
    templateUrl: './objective-dialog.component.html'
})
export class ObjectiveDialogComponent implements OnInit {

    objective: Objective;
    isSaving: boolean;

    creators: UserAccount[];

    cities: City[];

    objectivewishlists: ObjectiveWishList[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private objectiveService: ObjectiveService,
        private userAccountService: UserAccountService,
        private cityService: CityService,
        private objectiveWishListService: ObjectiveWishListService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userAccountService
            .query({filter: 'objective-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.objective.creator || !this.objective.creator.id) {
                    this.creators = res.json;
                } else {
                    this.userAccountService
                        .find(this.objective.creator.id)
                        .subscribe((subRes: UserAccount) => {
                            this.creators = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.cityService.query()
            .subscribe((res: ResponseWrapper) => { this.cities = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.objectiveWishListService.query()
            .subscribe((res: ResponseWrapper) => { this.objectivewishlists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.objective, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.objective.id !== undefined) {
            this.subscribeToSaveResponse(
                this.objectiveService.update(this.objective));
        } else {
            this.subscribeToSaveResponse(
                this.objectiveService.create(this.objective));
        }
    }

    private subscribeToSaveResponse(result: Observable<Objective>) {
        result.subscribe((res: Objective) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Objective) {
        this.eventManager.broadcast({ name: 'objectiveListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserAccountById(index: number, item: UserAccount) {
        return item.id;
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }

    trackObjectiveWishListById(index: number, item: ObjectiveWishList) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-objective-popup',
    template: ''
})
export class ObjectivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private objectivePopupService: ObjectivePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.objectivePopupService
                    .open(ObjectiveDialogComponent as Component, params['id']);
            } else {
                this.objectivePopupService
                    .open(ObjectiveDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
