import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000'

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${API_URL}${url}`, {
      headers: this.headers,
      params,
    });
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
