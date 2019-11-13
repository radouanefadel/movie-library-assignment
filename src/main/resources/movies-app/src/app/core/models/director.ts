import { BaseModel } from './base-model';
import { Movie } from './movie';

export interface Director extends BaseModel{
    fullName: string;
    movies?: Array<Movie>;
}
