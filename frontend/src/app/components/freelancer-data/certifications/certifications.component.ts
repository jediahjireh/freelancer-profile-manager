import { Component, Input } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css',
})
export class CertificationsComponent {
  @Input() freelancer!: Freelancer;

  // check if the certification is expired or not
  isExpired(expirationDate: string | Date): string {
    const today = new Date();
    const expiration = new Date(expirationDate);

    return expiration < today ? 'Expired' : 'Expires';
  }
}
