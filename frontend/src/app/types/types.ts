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
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  profile: Profile;
  subscription: Subscription;
}

export interface Profile {
  id?: number;
  userId?: number;
  picture: string;
  jobTitle: string;
  description: string;
  hourlyRate: number;
  bio: string;
  availability: string;
  city: string;
  state: string;
  country: string;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  portfolioItems: PortfolioItem[];
  reviews: Review[];
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  name: string;
  level: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: number;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface Review {
  id: number;
  clientId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface Subscription {
  id: number;
  plan: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
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
