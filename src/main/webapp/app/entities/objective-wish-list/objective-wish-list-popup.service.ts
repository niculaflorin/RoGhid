import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ObjectiveWishList } from './objective-wish-list.model';
import { ObjectiveWishListService } from './objective-wish-list.service';

@Injectable()
export class ObjectiveWishListPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private objectiveWishListService: ObjectiveWishListService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.objectiveWishListService.find(id).subscribe((objectiveWishList) => {
                    this.ngbModalRef = this.objectiveWishListModalRef(component, objectiveWishList);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.objectiveWishListModalRef(component, new ObjectiveWishList());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    objectiveWishListModalRef(component: Component, objectiveWishList: ObjectiveWishList): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.objectiveWishList = objectiveWishList;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
