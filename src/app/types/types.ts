import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

// all freelancers data
export interface Freelancers {
  freelancers: Freelancer[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

// freelancer data structure
export interface Freelancer {
  id?: number;
  profilePicture: string;
  name: string;
  location: string;
  hourlyRate: number;
  bio: string;
  skills: string[];
  portfolio: PortfolioItem[];
  socialLinks: SocialLinks;
  contact: Contact;
}

export interface PortfolioItem {
  title: string;
  link: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}
