import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Freelancer } from '../../types/types';
import { ConfirmationService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatCardModule } from '@angular/material/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freelancer-actions',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    ConfirmPopupModule,
    MatCardModule,
    OverlayPanelModule,
  ],
  templateUrl: './freelancer-actions.component.html',
  styleUrl: './freelancer-actions.component.css',
  providers: [ConfirmationService],
})
export class FreelancerActionsComponent {
  constructor(private confirmationService: ConfirmationService) {}

  // locate button
  @ViewChild('deleteButton') deleteButton: any;

  // assume that initialisation of the freelancer will be provided
  @Input() freelancer!: Freelancer;
  @Output() edit: EventEmitter<Freelancer> = new EventEmitter<Freelancer>();
  @Output() delete: EventEmitter<Freelancer> = new EventEmitter<Freelancer>();

  // handle actions by triggering the events
  editFreelancer() {
    this.edit.emit(this.freelancer);
  }

  deleteFreelancer() {
    this.delete.emit(this.freelancer);
  }

  // prompt user to confirm or reject freelancer removal
  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to remove this freelancer?',
      accept: () => {
        this.deleteFreelancer();
      },
    });
  }
}
