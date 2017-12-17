import { Component} from '@angular/core';

@Component({
    selector: 'jhi-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
})
export class MapsComponent{

    lat: number = 45.8;
    lng: number = 24.9;
    description: 'Initial';
    zoom:number = 7 ;
    markers: marker[] = [
        {
            lat:44.4346405,
            lng: 26.0850041,
            label: 'A',
            description: 'Coloana Infinită sau Coloana fără sfârșit este o sculptură a artistului român Constantin Brâncuși, parte a trilogiei Ansamblului Monumental din Târgu Jiu',
            imgPath: require("../../../content/images/brasov.jpg"),
            title:'Coloana infinitului',
            rating: 5
        },
        {
            lat: 45.1033728,
            lng: 24.3605583,
            label: 'B',
            description: 'Cel mai tare oras. E plin de IT-sti',
            imgPath: require("../../../content/images/brasov.jpg"),
            title:'Valcea',
            rating:2
        },
        {
            lat: 46.8,
            lng: 25.7,
            label: 'B',
            description: 'Ceva in nordul Romaniei noastre iubite si dragi!',
            imgPath: require("../../../content/images/brasov.jpg"),
            title:'Nord Label',
            rating: 3.5
        }
    ]



    markerIconUrl() {
        return require('../../../content/images/Asset 5.png')
    }


}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    description: string;
    imgPath: string;
    title: string;
    rating: number;
}



