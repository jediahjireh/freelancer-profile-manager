import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerPersonalProfileComponent } from './freelancer-personal-profile/freelancer-personal-profile.component';

// declare routes: --routing
const routes: Routes = [
  {
    // primary route
    path: '',
    component: FreelancerPersonalProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerPersonalProfileRoutingModule {}
