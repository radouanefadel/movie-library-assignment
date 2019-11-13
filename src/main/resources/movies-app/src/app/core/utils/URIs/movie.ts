import { URI } from './model';
import { ORIGIN, PORT } from '../config';
import { HttpMethod } from './http-methods';

const host: string = `${ORIGIN}:${PORT}`;
const path: string = `${host}/movies`;
export const _movieURIs: Array<URI> = [
    {
        path,
        name: 'movies',
        method: HttpMethod.Get
    }, {
        path,
        name: 'addMovie',
        method: HttpMethod.Post
    }, {
        path,
        name: 'updateMovie',
        method: HttpMethod.Put
    }, {
        path,
        name: 'deleteMovie',
        method: HttpMethod.Delete
    }
];