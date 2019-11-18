
import { URI } from './model';
import { ORIGIN, PORT } from '../config';
import { HttpMethod } from './http-methods';

const host: string = `${ORIGIN}:${PORT}`;
const path: string = `${host}/types`;

export const _typesURIs: Array<URI> = [
    {
        path,
        name: 'types',
        method: HttpMethod.Get
    }
];