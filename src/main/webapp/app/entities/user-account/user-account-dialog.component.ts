import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserAccount } from './user-account.model';
import { UserAccountPopupService } from './user-account-popup.service';
import { UserAccountService } from './user-account.service';
import { User, UserService } from '../../shared';
import { UserGroup, UserGroupService } from '../user-group';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-account-dialog',
    templateUrl: './user-account-dialog.component.html'
})
export class UserAccountDialogComponent implements OnInit {

    userAccount: UserAccount;
    isSaving: boolean;

    users: User[];

    usergroups: UserGroup[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userAccountService: UserAccountService,
        private userService: UserService,
        private userGroupService: UserGroupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userGroupService.query()
            .subscribe((res: ResponseWrapper) => { this.usergroups = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userAccountService.update(this.userAccount));
        } else {
            this.subscribeToSaveResponse(
                this.userAccountService.create(this.userAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserAccount>) {
        result.subscribe((res: UserAccount) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserAccount) {
        this.eventManager.broadcast({ name: 'userAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackUserGroupById(index: number, item: UserGroup) {
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
    selector: 'jhi-user-account-popup',
    template: ''
})
export class UserAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAccountPopupService: UserAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userAccountPopupService
                    .open(UserAccountDialogComponent as Component, params['id']);
            } else {
                this.userAccountPopupService
                    .open(UserAccountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
