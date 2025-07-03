import {inject, Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {env} from '../../../environments/environment';


export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private http: HttpClient = inject(HttpClient);
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    params: new HttpParams(),
  };

  findAllPagination<T>(page = 1, limit = 10, search = '', path: string): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    if (search) {
      params = params.set('q', search);
    }
    return this.http.get<T[]>(`${env.host}${path}`, {params, observe: 'response'}).pipe(
      map(response => (
        {
        data: response.body || [],
        total: +response.headers.get('X-Total-Count')!
        }
      ))
    );
  }

  findByUserId<T>(path: string, id: string | ''): Observable<T> {
    let params = new HttpParams()
      .set('userId', id);
    return this.http.get<T>(`${env.host}${path}`, {params});
  }

  findById<T>(path: string, id: string | ''): Observable<T> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<T>(`${env.host}${path}`, {params});
  }

  delete(id: string, path: string): Observable<any> {
    return this.http.delete(
      `${env.host}${path}/${id}`,
      this.httpOptions
    );
  }

  save<T>(objeto: T, path: string): Observable<T> {
    return this.http.post<T>(
      `${env.host}${path}`,
      JSON.stringify(objeto),
      this.httpOptions
    );
  }

  put<T>(objeto: T[], path: string): Observable<T[]> {
    return this.http.put<T[]>(
      `${env.host}${path}`,
      JSON.stringify(objeto),
      this.httpOptions
    );
  }

  deleteAll<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${env.host}${path}`);
  }
}
