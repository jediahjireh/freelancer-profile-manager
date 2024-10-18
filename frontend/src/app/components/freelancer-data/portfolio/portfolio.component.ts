import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeLinkSquare02 } from '@ng-icons/huge-icons';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgIconComponent, CarouselModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  providers: [
    provideIcons({
      hugeLinkSquare02,
    }),
  ],
})
export class PortfolioComponent {
  @Input() freelancer!: Freelancer;

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
