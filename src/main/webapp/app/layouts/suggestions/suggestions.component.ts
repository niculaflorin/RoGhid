import { Component } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-suggestions',
    templateUrl: './suggestions.component.html',
    styleUrls: [
        'suggestions.css'
    ]
})
export class SuggestionsComponent {

    ShowList() {
        document.getElementById('options').style.display = 'block';
    }

     HideList() {
       document.getElementById('options').style.display = 'none';
    }
}
