import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { EducationComponent } from '../education/education.component';
import { CertificationsComponent } from '../certifications/certifications.component';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { SkillsComponent } from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { SubscriptionComponent } from '../subscription/subscription.component';

@Component({
  selector: 'app-profile-elements',
  standalone: true,
  imports: [
    EducationComponent,
    CertificationsComponent,
    ExperiencesComponent,
    SkillsComponent,
    PortfolioComponent,
    ReviewsComponent,
    SocialLinksComponent,
    CommonModule,
    ProfileHeaderComponent,
    MatCardModule,
    SkillsComponent,
    SubscriptionComponent,
  ],
  templateUrl: './profile-elements.component.html',
  styleUrl: './profile-elements.component.css',
})
export class ProfileElementsComponent {
  @Input() freelancer!: Freelancer;
}
