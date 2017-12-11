import { BaseEntity } from './../../shared';

export class UserGroup implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public users?: BaseEntity[],
        public assignedWishlist?: BaseEntity,
    ) {
    }
}
