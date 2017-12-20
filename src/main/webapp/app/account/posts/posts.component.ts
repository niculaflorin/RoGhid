import {Component, OnInit,} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Objective } from '../../entities/objective/objective.model';
import { ObjectiveService } from '../../entities/objective/objective.service';
import {ResponseWrapper} from "../../shared";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {SERVER_API_URL} from "../../app.constants";
import {JhiDateUtils} from "ng-jhipster";


@Component({
    selector: 'jhi-posts',
    templateUrl: './posts.component.html',
    styleUrls: [
        'posts.css'
    ],
})
export class PostsComponent implements OnInit {
    constructor() {
    }


    ngOnInit() {
    }




}
