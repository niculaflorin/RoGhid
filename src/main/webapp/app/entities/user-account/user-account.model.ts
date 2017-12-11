import { BaseEntity, User } from './../../shared';

export class UserAccount implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public baseUser?: User,
        public postedRatings?: BaseEntity[],
        public postedComments?: BaseEntity[],
        public editRequests?: BaseEntity[],
        public wishlists?: BaseEntity[],
        public groups?: BaseEntity[],
    ) {
    }
}
