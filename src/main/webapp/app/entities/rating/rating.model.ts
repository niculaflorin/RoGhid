import { BaseEntity } from './../../shared';

export class Rating implements BaseEntity {
    constructor(
        public id?: number,
        public score?: number,
        public creationDate?: any,
        public objective?: BaseEntity,
        public poster?: BaseEntity,
    ) {
    }
}
