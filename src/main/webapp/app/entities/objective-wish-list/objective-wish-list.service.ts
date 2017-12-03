import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ObjectiveWishList } from './objective-wish-list.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ObjectiveWishListService {

    private resourceUrl = SERVER_API_URL + 'api/objective-wish-lists';

    constructor(private http: Http) { }

    create(objectiveWishList: ObjectiveWishList): Observable<ObjectiveWishList> {
        const copy = this.convert(objectiveWishList);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(objectiveWishList: ObjectiveWishList): Observable<ObjectiveWishList> {
        const copy = this.convert(objectiveWishList);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ObjectiveWishList> {
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
     * Convert a returned JSON object to ObjectiveWishList.
     */
    private convertItemFromServer(json: any): ObjectiveWishList {
        const entity: ObjectiveWishList = Object.assign(new ObjectiveWishList(), json);
        return entity;
    }

    /**
     * Convert a ObjectiveWishList to a JSON which can be sent to the server.
     */
    private convert(objectiveWishList: ObjectiveWishList): ObjectiveWishList {
        const copy: ObjectiveWishList = Object.assign({}, objectiveWishList);
        return copy;
    }
}
