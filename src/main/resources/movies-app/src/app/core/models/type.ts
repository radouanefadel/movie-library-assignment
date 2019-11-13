import { BaseModel } from './base-model';
import { Movie } from './movie';

export interface Type extends BaseModel{
    label: string;
    movies?: Array<Movie>;
}
