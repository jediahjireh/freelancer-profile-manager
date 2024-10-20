import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  @Input() freelancer!: Freelancer;
}
