import { HttpMethod } from './http-methods';

export interface URI {
    name?: string;
    path: string;
    method?: HttpMethod;
}