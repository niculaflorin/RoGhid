import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SERVER_API_URL } from '../../app.constants';
import { Observable } from 'rxjs/Rx';
import { Maps } from './maps.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MapsService {

    private resourceUrl = SERVER_API_URL + 'api/objectives/latlong';

    constructor (private http : Http) { }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to Maps.
     */
    private convertItemFromServer(json: any): Maps {
        const entity: Maps = Object.assign(new Maps(), json);
        return entity;
    }


}
