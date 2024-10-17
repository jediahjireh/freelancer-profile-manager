import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  @Input() freelancer!: Freelancer;
}
