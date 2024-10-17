import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreelancerProfileRoutingModule } from './freelancer-profile-routing.module';
import { MessagesModule } from 'primeng/messages';
import { EditPopupComponent } from '../../components/edit-popup/edit-popup.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerComponent } from '../../components/freelancer-listing-card/freelancer/freelancer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileElementsComponent } from '../../components/freelancer-data/profile-elements/profile-elements.component';

// declare routes
@NgModule({
  // register created components (residing within module) for them to have access to the imported modules below
  declarations: [FreelancerProfileComponent],
  imports: [
    CommonModule,
    FreelancerProfileRoutingModule,
    MessagesModule,
    EditPopupComponent,
    FreelancerComponent,
    MatProgressSpinnerModule,
    ProfileElementsComponent,
  ],
  exports: [FreelancerProfileComponent],
})
export class FreelancerProfileModule {}
