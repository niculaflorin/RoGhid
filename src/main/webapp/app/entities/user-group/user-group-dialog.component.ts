import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserGroup } from './user-group.model';
import { UserGroupPopupService } from './user-group-popup.service';
import { UserGroupService } from './user-group.service';
import { UserAccount, UserAccountService } from '../user-account';
import { ObjectiveWishList, ObjectiveWishListService } from '../objective-wish-list';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-group-dialog',
    templateUrl: './user-group-dialog.component.html'
})
export class UserGroupDialogComponent implements OnInit {

    userGroup: UserGroup;
    isSaving: boolean;

    useraccounts: UserAccount[];

    objectivewishlists: ObjectiveWishList[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userGroupService: UserGroupService,
        private userAccountService: UserAccountService,
        private objectiveWishListService: ObjectiveWishListService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userAccountService.query()
            .subscribe((res: ResponseWrapper) => { this.useraccounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.objectiveWishListService.query()
            .subscribe((res: ResponseWrapper) => { this.objectivewishlists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userGroupService.update(this.userGroup));
        } else {
            this.subscribeToSaveResponse(
                this.userGroupService.create(this.userGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserGroup>) {
        result.subscribe((res: UserGroup) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserGroup) {
        this.eventManager.broadcast({ name: 'userGroupListModification', content: 'OK'});
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

    trackObjectiveWishListById(index: number, item: ObjectiveWishList) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-user-group-popup',
    template: ''
})
export class UserGroupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userGroupPopupService: UserGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userGroupPopupService
                    .open(UserGroupDialogComponent as Component, params['id']);
            } else {
                this.userGroupPopupService
                    .open(UserGroupDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
