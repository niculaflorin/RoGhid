import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EditRequest } from './edit-request.model';
import { EditRequestPopupService } from './edit-request-popup.service';
import { EditRequestService } from './edit-request.service';
import { UserAccount, UserAccountService } from '../user-account';
import { Objective, ObjectiveService } from '../objective';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-edit-request-dialog',
    templateUrl: './edit-request-dialog.component.html'
})
export class EditRequestDialogComponent implements OnInit {

    editRequest: EditRequest;
    isSaving: boolean;

    useraccounts: UserAccount[];

    objectives: Objective[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private editRequestService: EditRequestService,
        private userAccountService: UserAccountService,
        private objectiveService: ObjectiveService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userAccountService.query()
            .subscribe((res: ResponseWrapper) => { this.useraccounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.objectiveService.query()
            .subscribe((res: ResponseWrapper) => { this.objectives = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.editRequest.id !== undefined) {
            this.subscribeToSaveResponse(
                this.editRequestService.update(this.editRequest));
        } else {
            this.subscribeToSaveResponse(
                this.editRequestService.create(this.editRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<EditRequest>) {
        result.subscribe((res: EditRequest) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EditRequest) {
        this.eventManager.broadcast({ name: 'editRequestListModification', content: 'OK'});
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

    trackObjectiveById(index: number, item: Objective) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-edit-request-popup',
    template: ''
})
export class EditRequestPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private editRequestPopupService: EditRequestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.editRequestPopupService
                    .open(EditRequestDialogComponent as Component, params['id']);
            } else {
                this.editRequestPopupService
                    .open(EditRequestDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
