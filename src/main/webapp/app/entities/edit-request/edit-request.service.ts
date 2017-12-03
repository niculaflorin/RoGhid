import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EditRequest } from './edit-request.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EditRequestService {

    private resourceUrl = SERVER_API_URL + 'api/edit-requests';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(editRequest: EditRequest): Observable<EditRequest> {
        const copy = this.convert(editRequest);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(editRequest: EditRequest): Observable<EditRequest> {
        const copy = this.convert(editRequest);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EditRequest> {
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
     * Convert a returned JSON object to EditRequest.
     */
    private convertItemFromServer(json: any): EditRequest {
        const entity: EditRequest = Object.assign(new EditRequest(), json);
        entity.requestDate = this.dateUtils
            .convertDateTimeFromServer(json.requestDate);
        return entity;
    }

    /**
     * Convert a EditRequest to a JSON which can be sent to the server.
     */
    private convert(editRequest: EditRequest): EditRequest {
        const copy: EditRequest = Object.assign({}, editRequest);

        copy.requestDate = this.dateUtils.toDate(editRequest.requestDate);
        return copy;
    }
}
