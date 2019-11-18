import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { typesURIs } from '../utils/URIs';
import { URI } from '../utils/URIs/model';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private _URIs: Array<URI> = typesURIs;
  
  constructor(private http: HttpClient) { }
  
  findAll(): Observable<Array<Type>> {
    const uri: URI = this._URIs.find(e => e.name === 'types');
    return this.http.get(uri.path)  as Observable<Array<Type>>;
  }
  
  findMovies(label: string): Observable<Type> {
    const uri: URI = this._URIs.find(e => e.name === 'types');
    return this.http.get(`${uri.path}/${label}/movies`)  as Observable<Type>;
  }
}
