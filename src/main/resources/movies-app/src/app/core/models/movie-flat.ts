import { BaseModel } from './base-model';

export interface MovieFlat extends BaseModel {
    title: string;
    director: string;
    releaseDate: string;
    type: string;
}
