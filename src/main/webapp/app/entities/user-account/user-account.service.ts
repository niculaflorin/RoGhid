import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UserAccount } from './user-account.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserAccountService {

    private resourceUrl = SERVER_API_URL + 'api/user-accounts';

    constructor(private http: Http) { }

    create(userAccount: UserAccount): Observable<UserAccount> {
        const copy = this.convert(userAccount);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userAccount: UserAccount): Observable<UserAccount> {
        const copy = this.convert(userAccount);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserAccount> {
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
     * Convert a returned JSON object to UserAccount.
     */
    private convertItemFromServer(json: any): UserAccount {
        const entity: UserAccount = Object.assign(new UserAccount(), json);
        return entity;
    }

    /**
     * Convert a UserAccount to a JSON which can be sent to the server.
     */
    private convert(userAccount: UserAccount): UserAccount {
        const copy: UserAccount = Object.assign({}, userAccount);
        return copy;
    }
}
