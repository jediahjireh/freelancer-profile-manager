import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { FreelancersService } from '../../../services/freelancers.service';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-freelancer-personal-profile',
  templateUrl: './freelancer-personal-profile.component.html',
  styleUrl: './freelancer-personal-profile.component.css',
})
export class FreelancerPersonalProfileComponent implements OnInit {
  freelancer!: Freelancer;
  selectedFreelancer!: Freelancer;
  // display popup
  displayEditPopup: boolean = false;
  // track loading state
  isLoading: boolean = false;

  // inject services
  constructor(
    private freelancersService: FreelancersService,
    public notificationService: NotificationService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  // fetch specific freelancer profile data by id from server
  fetchFreelancer(id: number) {
    this.isLoading = true;

    this.freelancersService.getFreelancerById(id).subscribe({
      next: (freelancer: Freelancer) => {
        // assign fetched data
        this.freelancer = freelancer;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.addMessage(
          'error',
          'Unsuccessful',
          'Freelancer profile could not be fetched.'
        );
        this.isLoading = false;
      },
    });
  }

  // toggle displays
  toggleEditPopup(freelancer: Freelancer) {
    // ensure freelancer profile exists
    if (freelancer.id !== undefined) {
      this.selectedFreelancer = freelancer;
      this.displayEditPopup = true;
      this.cdr.detectChanges();
    } else {
      // if id is undefined
      this.notificationService.addMessage(
        'error',
        'Error',
        'Freelancer profile not found.'
      );
    }
  }

  // confirmation logic
  onConfirmEdit(freelancer: Freelancer) {
    // do not invoke method if freelancer cannot be found
    if (!this.selectedFreelancer.id) {
      return;
    }

    this.editFreelancer(freelancer, this.selectedFreelancer.id);
    this.displayEditPopup = false;
  }

  // edit profile data functionality
  editFreelancer(freelancer: Freelancer, id: number) {
    if (!freelancer) {
      console.error('Freelancer object is null or undefined');
      return;
    }

    this.isLoading = true;

    /*
    console.log('editFreelancer called');
    console.log('freelancer:', freelancer);
    console.log('id:', id);
    */

    // merge new freelancer object with existing one - preserve existing properties, update new values
    this.freelancer = { ...this.freelancer, ...freelancer };

    this.freelancersService.editFreelancer(id, freelancer).subscribe({
      next: (data) => {
        this.notificationService.addMessage(
          'success',
          'Success',
          'Freelancer profile successfully updated!'
        );
        // refresh page
        // window.location.reload();
        this.isLoading = false;
      },
      error: (error) => {
        // console.error(error);
        this.notificationService.addMessage(
          'error',
          'Unsuccessful',
          'Freelancer profile could not be updated! Please retry.'
        );
        this.isLoading = false;
      },
    });
  }

  /*
   toggleDeletePopup(freelancer: Freelancer) {
    if (freelancer.id !== undefined) {
      this.deleteFreelancer(freelancer.id);
      this.cdr.detectChanges();
    } else {
      // if id is undefined
      this.notificationService.addMessage(
        'error',
        'Error',
        'Freelancer profile not found.'
      );
    }
  }

  deleteFreelancer(id: number) {
    this.isLoading = true;

    this.freelancersService.deleteFreelancer(id).subscribe({
      next: (data) => {
        this.notificationService.addMessage(
          'success',
          'Success',
          'Freelancer profile successfully removed!'
        );
        // refresh page
        window.location.reload();
        this.isLoading = false;
      },
      error: (error) => {
        // console.error(error);
        this.notificationService.addMessage(
          'error',
          'Unsuccessful',
          'Freelancer profile could not be deleted! Please retry.'
        );
        this.isLoading = false;
      },
    });
  }

  // locate button
  @ViewChild('deleteButton') deleteButton: any;

  // prompt user to confirm or reject freelancer removal -  private confirmationService: ConfirmationService
  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to remove this freelancer?',
      accept: () => {
        this.deleteFreelancer(this.freelancer.id);
      },
    });
  }
    */

  ngOnInit(): void {
    // fetch freelancer data when component loads
    this.fetchFreelancer(1);
    this.isLoading = false;
  }
}
