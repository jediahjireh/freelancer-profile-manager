import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { MatCardModule } from '@angular/material/card';
import { hugeCoins01, hugePinLocation02 } from '@ng-icons/huge-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PricePipe } from '../../../pipes/price.pipe';
import { PortfolioComponent } from '../../freelancer-data/portfolio/portfolio.component';
import { SkillsComponent } from '../../freelancer-data/skills/skills.component';
import { Freelancer } from '../../../types/types';

@Component({
  selector: 'app-freelancer-content',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    PricePipe,
    NgIconComponent,
    MatCardModule,
    PortfolioComponent,
    SkillsComponent,
    CarouselModule,
  ],
  templateUrl: './freelancer-content.component.html',
  styleUrl: './freelancer-content.component.css',
  providers: [
    provideIcons({
      hugeCoins01,
      hugePinLocation02,
    }),
  ],
})
export class FreelancerContentComponent {
  @Input() freelancer!: Freelancer;

  // configuration for portfolio horizontal carousel animation
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 450,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      250: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    // do not show navigation toggle (aesthetic purposes)
    nav: false,

    autoplay: true,
    // time in ms between each slide
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    // control transition speed
    autoplaySpeed: 800,
    smartSpeed: 1000,
  };
}
