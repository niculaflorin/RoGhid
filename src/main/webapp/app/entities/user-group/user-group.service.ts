import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UserGroup } from './user-group.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserGroupService {

    private resourceUrl = SERVER_API_URL + 'api/user-groups';

    constructor(private http: Http) { }

    create(userGroup: UserGroup): Observable<UserGroup> {
        const copy = this.convert(userGroup);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userGroup: UserGroup): Observable<UserGroup> {
        const copy = this.convert(userGroup);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserGroup> {
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
     * Convert a returned JSON object to UserGroup.
     */
    private convertItemFromServer(json: any): UserGroup {
        const entity: UserGroup = Object.assign(new UserGroup(), json);
        return entity;
    }

    /**
     * Convert a UserGroup to a JSON which can be sent to the server.
     */
    private convert(userGroup: UserGroup): UserGroup {
        const copy: UserGroup = Object.assign({}, userGroup);
        return copy;
    }
}
