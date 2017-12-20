import { Component, Input , OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Objective } from '../../entities/objective/objective.model';
import { ObjectiveService } from '../../entities/objective/objective.service';
import { ResponseWrapper, createRequestOption } from '../../shared';
import { City } from '../../entities/city/city.model';
import { CityService } from '../../entities/city/city.service';
import { Region } from '../../entities/region/region.model';
import { RegionService } from '../../entities/region/region.service';

@Component({
    selector: 'jhi-suggestions',
    templateUrl: './suggestions.component.html',
    styleUrls: [
        'suggestions.css'
    ]
})
export class SuggestionsComponent implements OnInit {
    objectives: Objective[];
    filter: number;
    cities: City[];
    regions: Region[];
    cr: number;
    constructor(
        private objectiveService: ObjectiveService,
        private cityService: CityService,
        private regionService: RegionService
    ) {

    }

    loadAll() {
        this.objectiveService.query().subscribe(
            (res: ResponseWrapper) => {
                this.objectives = res.json;
            }
        );
    }
    loadCities() {
        this.cityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cities = res.json;
            }
        );
    }

    loadRegions() {
        this.regionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.regions = res.json;
            }
        );
    }
    ngOnInit() {

    this.loadAll();
    this.loadCities();
    this.loadRegions();
    }

    toggleShowFilterList() {
        this.cr = 0;
        if (document.getElementById('options').style.display  == 'none') {
            document.getElementById('options').style.display = 'block';
        } else {
            document.getElementById('options').style.display  = 'none';
        }
    }

    changefilter(i, value) {
      this.filter = i;
      this.cr = value;
    }
    getFilter() {
        return this.filter;
    }

    getTypeObjective() {
        return this.cr;
    }

}
