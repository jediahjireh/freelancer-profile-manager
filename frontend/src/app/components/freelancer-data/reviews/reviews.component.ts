import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CalendarPeriodPipe } from '../../../pipes/calendar-period.pipe';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CalendarPeriodPipe,
    RatingModule,
    FormsModule,
    CarouselModule,
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  @Input() freelancer!: Freelancer;

  // configuration for review horizontal carousel animation
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    // do not show navigation toggle (aesthetic purposes)
    nav: false,

    autoplay: true,
    // time in ms between each slide
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    // control transition speed
    autoplaySpeed: 1000,
    smartSpeed: 1000,
  };
}
