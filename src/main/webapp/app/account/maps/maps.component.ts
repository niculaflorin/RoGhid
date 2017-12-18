/*import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {
    Component,
    NgModule, OnInit
} from '@angular/core';


@Component({
    selector: 'jhi-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']})


export class MapsComponent implements marker{

    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: any) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng
        });
    }

    markers: marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A'

        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: 'B'

        },
        {
            lat: 51.723858,
            lng: 7.895982,
            label: 'C'

        }
    ]
}

interface marker {
    lat: number;
    lng: number;
    label?: string;
}

platformBrowserDynamic().bootstrapModule(MapsComponent)

*/
import { Component, OnInit} from '@angular/core';
import {MapsService} from "./maps.service";
import { Maps } from './maps.model';
import { ResponseWrapper } from '../../shared/model/response-wrapper.model';
import { JhiAlertService} from 'ng-jhipster';

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
    markerIconUrl() {
        return require('../../../content/images/Asset 5.png')
    }

    constructor (private mapsService: MapsService,
                 private jhiAlertService: JhiAlertService) {}

    loadAll() {
        this.mapsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.markers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit(): void {
        this.loadAll();
    }


    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
