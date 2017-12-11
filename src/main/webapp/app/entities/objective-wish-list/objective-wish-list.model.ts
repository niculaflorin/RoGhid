import { BaseEntity } from './../../shared';

export class ObjectiveWishList implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public userAccount?: BaseEntity,
        public assignedGroup?: BaseEntity,
        public objectives?: BaseEntity[],
    ) {
    }
}
