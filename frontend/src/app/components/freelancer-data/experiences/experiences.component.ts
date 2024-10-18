import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CalendarPeriodPipe } from '../../../pipes/calendar-period.pipe';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, MatCardModule, CalendarPeriodPipe],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
})
export class ExperiencesComponent {
  @Input() freelancer!: Freelancer;
}
