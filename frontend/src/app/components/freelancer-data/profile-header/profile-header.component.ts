import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProfileInformationComponent } from '../../freelancer-listing-card/profile-information/profile-information.component';
import { FreelancerFooterComponent } from '../../freelancer-listing-card/freelancer-footer/freelancer-footer.component';
import { Freelancer } from '../../../types/types';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { PricePipe } from '../../../pipes/price.pipe';
import { hugeCoins01, hugePinLocation02 } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ProfileInformationComponent,
    FreelancerFooterComponent,
    TruncateNamePipe,
    NgIconComponent,
    PricePipe,
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
  providers: [
    provideIcons({
      hugePinLocation02,
      hugeCoins01,
    }),
  ],
})
export class ProfileHeaderComponent {
  @Input() freelancer!: Freelancer;
}
