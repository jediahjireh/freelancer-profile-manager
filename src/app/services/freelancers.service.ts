import { Injectable } from '@angular/core';
import { Freelancers, PaginationParams } from '../types/types';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

// encapsulate business logic
export class FreelancersService {
  constructor(private apiService: ApiService) {}

  // get freelancers from the API
  getFreelancers = (
    url: string,
    params: PaginationParams
  ): Observable<Freelancers> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  // add freelancer via the API
  addFreelancer = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // edit freelancer data via the API
  editFreelancer = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // remove freelancer via the API
  deleteFreelancer = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}
