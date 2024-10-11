import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { Freelancer } from '../../types/types';
import {
  hugeCall,
  hugeCoins01,
  hugeGithub01,
  hugeLinkedin01,
  hugeMail01,
  hugePinLocation02,
} from '@ng-icons/huge-icons';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
  withContentSecurityPolicy,
} from '@ng-icons/core';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-freelancer',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    PricePipe,
    TruncateNamePipe,
    NgIconComponent,
    MatCardModule,
    OverlayPanelModule,
    MatTreeModule,
  ],
  templateUrl: './freelancer.component.html',
  styleUrl: './freelancer.component.css',
  providers: [
    ConfirmationService,
    provideIcons({
      hugeCoins01,
      hugePinLocation02,
      hugeLinkedin01,
      hugeGithub01,
      hugeMail01,
      hugeCall,
    }),
  ],
})
export class FreelancerComponent {
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
