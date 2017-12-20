import { Component, OnInit ,Input, EventEmitter,Output} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import {Account, LoginModalService, Principal, ResponseWrapper} from '../shared';
import {CityService} from "../entities/city/city.service";
import {City} from "../entities/city/city.model";
import {Observable} from "rxjs/Observable";
import { Objective } from '../entities/objective/objective.model';
import { ObjectiveService } from '../entities/objective/objective.service';
import { SearchFilter } from './filterr.pipe'


@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]
})

export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    cities: City[];
    filter: number;
    hide:number;
    objectives: Objective[];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
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
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAllCities();
        this.loadObjectives();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
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
