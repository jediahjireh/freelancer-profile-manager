import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css',
})
export class CertificationsComponent {
  @Input() freelancer!: Freelancer;
}
