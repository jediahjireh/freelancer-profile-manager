import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Freelancer, Options } from '../types/types';
// asynchronous data handling
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// enable data sharing: facilitate backend freelancer fetch calls
export class ApiService {
  // make api calls to specified url
  constructor(private httpClient: HttpClient) {}

  // GET requests to the API
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  // POST requests to the API
  post<T>(url: string, body: Freelancer, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  // PUT requests to the API
  put<T>(url: string, body: Freelancer, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  // DELETE requests to the API
  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
