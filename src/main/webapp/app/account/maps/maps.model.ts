import { BaseEntity } from './../../shared';

export class Maps implements BaseEntity {
    constructor(
        public id?: number,
        public latitude?: number,
        public longitude?: number,
    ) {
    }
}
