import { Routes } from '@angular/router';
import { FreelancerListingsComponent } from './freelancer-listings/freelancer-listings.component';
import { FreelancerProfileComponent } from './modules/freelancer-profile/freelancer-profile/freelancer-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: FreelancerListingsComponent,
  },
  // load module when accessing a specific route - lazy loading

  {
    path: 'freelancer-personal-profile',
    loadChildren: () =>
      import(
        './modules/freelancer-personal-profile/freelancer-personal-profile.module'
      ).then((m) => m.FreelancerPersonalProfileModule),
  },

  // dynamic id endpoint to navigate to specific freelancer
  {
    path: 'freelancer-profile/:id',
    loadChildren: () =>
      import('./modules/freelancer-profile/freelancer-profile.module').then(
        (m) => m.FreelancerProfileModule
      ),
  },

  // { path: 'freelancer-profile/:id', component: FreelancerProfileComponent },
];
