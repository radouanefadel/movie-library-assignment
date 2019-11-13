import { BaseModel } from './base-model'
import { Director } from './director';
import { Type } from './type';

export interface Movie extends BaseModel{
    title: string;
    director: Director;
    releaseDate: string;
    type: Type;
}
