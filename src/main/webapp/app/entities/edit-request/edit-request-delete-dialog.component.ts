import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EditRequest } from './edit-request.model';
import { EditRequestPopupService } from './edit-request-popup.service';
import { EditRequestService } from './edit-request.service';

@Component({
    selector: 'jhi-edit-request-delete-dialog',
    templateUrl: './edit-request-delete-dialog.component.html'
})
export class EditRequestDeleteDialogComponent {

    editRequest: EditRequest;

    constructor(
        private editRequestService: EditRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.editRequestService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'editRequestListModification',
                content: 'Deleted an editRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-edit-request-delete-popup',
    template: ''
})
export class EditRequestDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private editRequestPopupService: EditRequestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.editRequestPopupService
                .open(EditRequestDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
