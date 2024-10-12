import { Injectable } from '@angular/core';
import { Freelancer, Freelancers, PaginationParams } from '../types/types';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

// encapsulate business logic
export class FreelancersService {
  // base URL for the API
  private baseUrl: string = 'http://localhost:3000/freelancers';

  constructor(private apiService: ApiService) {}

  // get freelancers from the API
  getFreelancers = (params: PaginationParams): Observable<Freelancers> => {
    return this.apiService.get<Freelancers>(this.baseUrl, {
      params,
      responseType: 'json',
    });
  };

  // add freelancer via the API
  addFreelancer = (body: Freelancer): Observable<Freelancer> => {
    return this.apiService.post<Freelancer>(this.baseUrl, body, {});
  };

  // edit freelancer data via the API
  editFreelancer = (id: number, body: Freelancer): Observable<Freelancer> => {
    return this.apiService.put<Freelancer>(`${this.baseUrl}/${id}`, body, {});
  };

  // remove freelancer via the API
  deleteFreelancer = (id: number): Observable<Freelancer> => {
    return this.apiService.delete<Freelancer>(`${this.baseUrl}/${id}`, {});
  };

  // fetch a specific freelancer by ID
  getFreelancerById = (id: number): Observable<Freelancer> => {
    return this.apiService.get<Freelancer>(`${this.baseUrl}/${id}`, {
      responseType: 'json',
    });
  };
}
