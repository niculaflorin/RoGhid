import { Component, Input , OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Objective } from '../../entities/objective/objective.model';
import { ObjectiveService } from '../../entities/objective/objective.service';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Component({
    selector: 'jhi-suggestions',
    templateUrl: './suggestions.component.html',
    styleUrls: [
        'suggestions.css'
    ]
})
export class SuggestionsComponent implements OnInit {
    objectives: Objective[];
    imageUrl = '../../../content/images/brasov.jpg';
    constructor(
        private objectiveService: ObjectiveService
    ) {
    }

    loadAll() {
        this.objectiveService.query().subscribe(
            (res: ResponseWrapper) => {
                this.objectives = res.json;
            },
        );
    }

    ngOnInit() {

    this.loadAll();
    }

    ShowList() {
        document.getElementById('options').style.display = 'block';
    }

     HideList() {
       document.getElementById('options').style.display = 'none';
    }

}
