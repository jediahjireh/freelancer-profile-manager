import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
})
export class ExperiencesComponent {
  @Input() freelancer!: Freelancer;
}
