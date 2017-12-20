import { Component, OnInit ,Input, EventEmitter,Output} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { ResponseWrapper} from '../../shared';
import {CityService} from "../../entities/city/city.service";
import {City} from "../../entities/city/city.model";
import { Objective } from '../../entities/objective/objective.model';
import { ObjectiveService } from '../../entities/objective/objective.service';
import { SearchFilter } from '../../home/filterr.pipe'
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'jhi-acasa',
    templateUrl: './acasa.component.html',
    styleUrls: [
        'acasa.css'
    ]
})

export class AcasaComponent implements OnInit {
    cities: City[];
    filter: number;
    hide:number;
    objectives: Objective[];

    constructor(
        private cityService: CityService,
        private objectiveService:ObjectiveService
    ) {

    }
    loadObjectives() {
        this.objectiveService.query().subscribe(
            (res: ResponseWrapper) => {
                this.objectives = res.json;
            }
        );
    }
    ngOnInit() {
        this.loadAllCities();
        this.loadObjectives();
    }


    loadAllCities() {
        this.cityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cities = res.json;
            }
        );
    }
    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .map(term => term === '' ? []
                : this.cities.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    formatter = (x: {name: string}) => x.name;

    selectedItem(item){
        this.filter=item.item.id;
        console.log(this.filter);
    }

    onLoad(){

        document.getElementById("loader").style.display="inline-block";
        setTimeout(()=>{  document.getElementById("box").style.display="none";
            document.getElementById("postari").style.display="block";}, 2000);
    }

}
