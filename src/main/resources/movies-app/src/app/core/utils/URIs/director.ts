
import { URI } from './model';
import { ORIGIN, PORT } from '../config';
import { HttpMethod } from './http-methods';

const host: string = `${ORIGIN}:${PORT}`;
const path: string = `${host}/directors`;

export const _directorsURIs: Array<URI> = [
    {
        path,
        name: 'directors',
        method: HttpMethod.Get
    }
];