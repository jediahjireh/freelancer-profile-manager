import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  @Input() freelancer!: Freelancer;

  // get the rating based on the level
  getSkillRating(level: string): number {
    if (level.toLowerCase() === 'expert') {
      return 3;
    }

    if (level.toLowerCase() === 'intermediate') {
      return 2;
    }

    if (level.toLowerCase() === 'beginner') {
      return 1;
    }

    return 0;
  }
}
