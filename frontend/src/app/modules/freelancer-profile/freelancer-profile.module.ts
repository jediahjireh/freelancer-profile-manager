import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreelancerProfileRoutingModule } from './freelancer-profile-routing.module';
import { MessagesModule } from 'primeng/messages';
import { EditPopupComponent } from '../../components/edit-popup/edit-popup.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerComponent } from '../../components/freelancer/freelancer.component';

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
  ],
  exports: [FreelancerProfileComponent],
})
export class FreelancerProfileModule {}
