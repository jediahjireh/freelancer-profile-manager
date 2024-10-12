import { Routes } from '@angular/router';
import { FreelancerListingsComponent } from './freelancer-listings/freelancer-listings.component';

export const routes: Routes = [
  {
    path: '',
    component: FreelancerListingsComponent,
  },
  // load module when accessing a specific route - lazy loading
  {
    path: 'freelancer-profile',
    loadChildren: () =>
      import('./modules/freelancer-profile/freelancer-profile.module').then(
        (m) => m.FreelancerProfileModule
      ),
  },
];
