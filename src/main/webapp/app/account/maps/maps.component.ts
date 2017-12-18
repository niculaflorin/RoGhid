
import { Component, OnInit} from '@angular/core';
import {MapsService} from './maps.service';
import { Maps } from './maps.model';
import { ResponseWrapper } from '../../shared/model/response-wrapper.model';
import { JhiAlertService} from 'ng-jhipster';
import {ObjectiveService} from "../../entities/objective/objective.service";
import {Objective} from "../../entities/objective/objective.model";

@Component({
    selector: 'jhi-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
    providers: [MapsService]
})
export class MapsComponent {

    lat: number = 45.8;
    lng: number = 24.9;
    description: 'Initial';
    zoom:number = 7 ;
    markers: Maps[];
    objective: Objective;
    markerIconUrl() {
        return require('../../../content/images/Asset 5.png')
    }

    constructor (private mapsService: MapsService,
                 private objectiveService : ObjectiveService,
                 private jhiAlertService: JhiAlertService) {}

    loadAll() {
        this.mapsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.markers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    markerInfo(id : number) {
        this.objectiveService.find(id).subscribe(
            (objective) => {
                this.objective = objective;
            }
        );
    }

    ngOnInit(): void {
        this.loadAll();
    }


    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
