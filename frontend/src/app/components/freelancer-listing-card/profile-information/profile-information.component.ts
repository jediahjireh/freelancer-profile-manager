import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Freelancer } from '../../../types/types';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    MatCardModule,
    OverlayPanelModule,
    ConfirmPopupModule,
  ],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css',
  providers: [ConfirmationService],
})
export class ProfileInformationComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @Input() freelancer!: Freelancer;
}
