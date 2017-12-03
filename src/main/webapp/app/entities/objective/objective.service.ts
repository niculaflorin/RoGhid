import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Objective } from './objective.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ObjectiveService {

    private resourceUrl = SERVER_API_URL + 'api/objectives';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(objective: Objective): Observable<Objective> {
        const copy = this.convert(objective);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(objective: Objective): Observable<Objective> {
        const copy = this.convert(objective);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Objective> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Objective.
     */
    private convertItemFromServer(json: any): Objective {
        const entity: Objective = Object.assign(new Objective(), json);
        entity.creationDate = this.dateUtils
            .convertDateTimeFromServer(json.creationDate);
        return entity;
    }

    /**
     * Convert a Objective to a JSON which can be sent to the server.
     */
    private convert(objective: Objective): Objective {
        const copy: Objective = Object.assign({}, objective);

        copy.creationDate = this.dateUtils.toDate(objective.creationDate);
        return copy;
    }
}
