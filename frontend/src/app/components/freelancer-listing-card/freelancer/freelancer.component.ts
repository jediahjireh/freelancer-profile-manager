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
import { ToastModule } from 'primeng/toast';
import { Freelancer } from '../../../types/types';
import { MatCardModule } from '@angular/material/card';
import { FreelancerHeaderComponent } from '../freelancer-header/freelancer-header.component';
import { FreelancerFooterComponent } from '../freelancer-footer/freelancer-footer.component';
import { FreelancerContentComponent } from '../freelancer-content/freelancer-content.component';
import { ProfileInformationComponent } from '../profile-information/profile-information.component';

@Component({
  selector: 'app-freelancer',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    FreelancerHeaderComponent,
    FreelancerFooterComponent,
    FreelancerContentComponent,
    MatCardModule,
    ProfileInformationComponent,
  ],
  templateUrl: './freelancer.component.html',
  styleUrl: './freelancer.component.css',
})
export class FreelancerComponent {
  // assume freelancer will be provided via parent or service
  @Input() freelancer!: Freelancer;

  // redirect user to freelancer's personal profile when header is clicked
  @Output() headerClick = new EventEmitter<number>();

  /*
  // edit and delete actions
  @Output() edit = new EventEmitter<Freelancer>();
  @Output() delete = new EventEmitter<Freelancer>();
  // emit edit event
  editFreelancer() {
    this.edit.emit(this.freelancer);
  }

  // emit delete event
  deleteFreelancer() {
    this.delete.emit(this.freelancer);
  }
*/
  onHeaderClick() {
    // emit the id of the freelancer to freelancer listings
    this.headerClick.emit(this.freelancer.id);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
