import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Freelancer } from '../../../types/types';
import { SocialLinksComponent } from '../../freelancer-data/social-links/social-links.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freelancer-footer',
  standalone: true,
  imports: [MatCardModule, SocialLinksComponent, CommonModule],
  templateUrl: './freelancer-footer.component.html',
  styleUrl: './freelancer-footer.component.css',
})
export class FreelancerFooterComponent {
  @Input() freelancer!: Freelancer;
}
