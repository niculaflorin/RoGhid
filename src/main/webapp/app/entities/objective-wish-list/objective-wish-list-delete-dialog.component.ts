import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ObjectiveWishList } from './objective-wish-list.model';
import { ObjectiveWishListPopupService } from './objective-wish-list-popup.service';
import { ObjectiveWishListService } from './objective-wish-list.service';

@Component({
    selector: 'jhi-objective-wish-list-delete-dialog',
    templateUrl: './objective-wish-list-delete-dialog.component.html'
})
export class ObjectiveWishListDeleteDialogComponent {

    objectiveWishList: ObjectiveWishList;

    constructor(
        private objectiveWishListService: ObjectiveWishListService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.objectiveWishListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'objectiveWishListListModification',
                content: 'Deleted an objectiveWishList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-objective-wish-list-delete-popup',
    template: ''
})
export class ObjectiveWishListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private objectiveWishListPopupService: ObjectiveWishListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.objectiveWishListPopupService
                .open(ObjectiveWishListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
