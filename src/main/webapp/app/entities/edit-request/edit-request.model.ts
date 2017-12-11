import { BaseEntity } from './../../shared';

export class EditRequest implements BaseEntity {
    constructor(
        public id?: number,
        public requestDate?: any,
        public isApproved?: boolean,
        public userAccount?: BaseEntity,
        public objective?: BaseEntity,
    ) {
        this.isApproved = false;
    }
}
