import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ObjectiveWishList } from './objective-wish-list.model';
import { ObjectiveWishListPopupService } from './objective-wish-list-popup.service';
import { ObjectiveWishListService } from './objective-wish-list.service';
import { UserAccount, UserAccountService } from '../user-account';
import { UserGroup, UserGroupService } from '../user-group';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-objective-wish-list-dialog',
    templateUrl: './objective-wish-list-dialog.component.html'
})
export class ObjectiveWishListDialogComponent implements OnInit {

    objectiveWishList: ObjectiveWishList;
    isSaving: boolean;

    useraccounts: UserAccount[];

    assignedgroups: UserGroup[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private objectiveWishListService: ObjectiveWishListService,
        private userAccountService: UserAccountService,
        private userGroupService: UserGroupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userAccountService.query()
            .subscribe((res: ResponseWrapper) => { this.useraccounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userGroupService
            .query({filter: 'assignedwishlist-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.objectiveWishList.assignedGroup || !this.objectiveWishList.assignedGroup.id) {
                    this.assignedgroups = res.json;
                } else {
                    this.userGroupService
                        .find(this.objectiveWishList.assignedGroup.id)
                        .subscribe((subRes: UserGroup) => {
                            this.assignedgroups = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.objectiveWishList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.objectiveWishListService.update(this.objectiveWishList));
        } else {
            this.subscribeToSaveResponse(
                this.objectiveWishListService.create(this.objectiveWishList));
        }
    }

    private subscribeToSaveResponse(result: Observable<ObjectiveWishList>) {
        result.subscribe((res: ObjectiveWishList) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ObjectiveWishList) {
        this.eventManager.broadcast({ name: 'objectiveWishListListModification', content: 'OK'});
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

    trackUserGroupById(index: number, item: UserGroup) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-objective-wish-list-popup',
    template: ''
})
export class ObjectiveWishListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private objectiveWishListPopupService: ObjectiveWishListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.objectiveWishListPopupService
                    .open(ObjectiveWishListDialogComponent as Component, params['id']);
            } else {
                this.objectiveWishListPopupService
                    .open(ObjectiveWishListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
