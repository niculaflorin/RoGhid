import { Component} from '@angular/core';

@Component({
    selector: 'jhi-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent{

    lat: number = 45.8;
    lng: number = 24.9;
    zoom:number = 7 ;

}
