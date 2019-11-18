import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { directorsURIs } from '../utils/URIs';
import { URI } from '../utils/URIs/model';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorsService {
  
  private _URIs: Array<URI> = directorsURIs;
  
  constructor(private http: HttpClient) { }
  
  findAll(): Observable<Array<Director>> {
    const uri: URI = this._URIs.find(e => e.name === 'directors');
    return this.http.get(uri.path)  as Observable<Array<Director>>;
  }
  
  findMovies(fullName: string): Observable<Director> {
    const uri: URI = this._URIs.find(e => e.name === 'directors');
    return this.http.get(`${uri.path}/${fullName}/movies`)  as Observable<Director>;
  }
}