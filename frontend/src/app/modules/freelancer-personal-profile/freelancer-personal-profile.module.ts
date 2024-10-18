import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreelancerPersonalProfileRoutingModule } from './freelancer-personal-profile-routing.module';
import { FreelancerPersonalProfileComponent } from './freelancer-personal-profile/freelancer-personal-profile.component';
import { MessagesModule } from 'primeng/messages';
import { EditPopupComponent } from '../../components/edit-popup/edit-popup.component';
import { FreelancerComponent } from '../../components/freelancer-listing-card/freelancer/freelancer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileElementsComponent } from '../../components/freelancer-data/profile-elements/profile-elements.component';

@NgModule({
  // register created components (residing within module) for them to have access to the imported modules below
  declarations: [FreelancerPersonalProfileComponent],
  imports: [
    CommonModule,
    FreelancerPersonalProfileRoutingModule,
    MessagesModule,
    EditPopupComponent,
    MatProgressSpinnerModule,
    ProfileElementsComponent,
  ],
  exports: [FreelancerPersonalProfileComponent],
})
export class FreelancerPersonalProfileModule {}
