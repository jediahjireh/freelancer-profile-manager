import { Routes } from '@angular/router';
// import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerListingsComponent } from './freelancer-listings/freelancer-listings.component';

export const routes: Routes = [
  {
    path: '',
    component: FreelancerListingsComponent,
  },
  // load module when accessing a specific route
  /*
  {
    path: 'freelancer-profile',
    loadChildren: () =>
      import('./modules/freelancer-profile/freelancer-profile.module').then((m) => m.FreelancerProfileModule),
  },
  */
];
