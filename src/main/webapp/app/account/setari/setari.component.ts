import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { LoginModalService, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../../shared';

@Component({
    selector: 'jhi-setari',
    templateUrl: './setari.component.html',
    styleUrls: [
        './setari.css'
    ]
})
export class SetariComponent implements OnInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router
    ) {
    }

    ngOnInit() {

    }

    setari() {
      console.log('aiciii');
    }
}
