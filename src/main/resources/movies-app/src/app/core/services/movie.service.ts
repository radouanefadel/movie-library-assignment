import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URI } from '../utils/URIs/model';
import { movieURIs } from '../utils/URIs';
import { Movie } from '../models/movie';
import { MovieFlat } from '../models/movie-flat';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _URIs: Array<URI> = movieURIs;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<Movie>> {
    const uri: URI = this._URIs.find(e => e.name === 'movies');
    return this.http.get(uri.path) as Observable<Array<Movie>>;
  }

  save(payload: MovieFlat): Observable<Movie> {
    const uri: URI = this._URIs.find(e => e.name === 'addMovie');
    return this.http.post(uri.path, payload) as Observable<Movie>;
  }

  update(payload: MovieFlat) {
    const uri: URI = this._URIs.find(e => e.name === 'updateMovie');
    return this.http.put(uri.path, payload) as Observable<Movie>;
  }

  delete(uuid: string): Observable<any> {
    const uri: URI = this._URIs.find(e => e.name === 'updateMovie');
    return this.http.delete(`${uri.path}/${uuid}`);
  }
}
