import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { MatCardModule } from '@angular/material/card';
import { hugePinLocation02 } from '@ng-icons/huge-icons';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { Freelancer } from '../../../types/types';

@Component({
  selector: 'app-freelancer-header',
  standalone: true,
  imports: [TruncateNamePipe, NgIconComponent, MatCardModule],
  templateUrl: './freelancer-header.component.html',
  styleUrl: './freelancer-header.component.css',
  providers: [
    provideIcons({
      hugePinLocation02,
    }),
  ],
})
export class FreelancerHeaderComponent {
  @Input() freelancer!: Freelancer;
}
