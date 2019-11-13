import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URI } from '../utils/URIs/model';
import { movieURIs } from '../utils/URIs';
import { Observable } from 'rxjs';
import { MovieFlat } from '../models/movie-flat';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _URIs: Array<URI> = movieURIs;

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    const uri: URI = this._URIs.find(e => e.name === 'movies');
    return this.http.get(uri.path);
  }

  save(payload: MovieFlat): Observable<any> {
    const uri: URI = this._URIs.find(e => e.name === 'addMovie');
    return this.http.post(uri.path, payload);
  }
}
