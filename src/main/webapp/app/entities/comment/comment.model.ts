import { BaseEntity } from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public comment?: string,
        public creationDate?: any,
        public objective?: BaseEntity,
        public poster?: BaseEntity,
    ) {
    }
}
