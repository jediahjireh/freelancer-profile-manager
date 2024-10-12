import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';

// declare routes: --routing
const routes: Routes = [
  {
    // primary route
    path: '',
    component: FreelancerProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerProfileRoutingModule {}
