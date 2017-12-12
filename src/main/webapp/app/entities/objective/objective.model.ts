import { BaseEntity } from './../../shared';

export class Objective implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public imagePath?: string,
        public creationDate?: any,
        public rating?: number,
        public latitude?: number,
        public longitude?: number,
        public creator?: BaseEntity,
        public ratings?: BaseEntity[],
        public comments?: BaseEntity[],
        public editRequests?: BaseEntity[],
        public city?: BaseEntity,
        public objectiveWishList?: BaseEntity,
    ) {
    }
}
