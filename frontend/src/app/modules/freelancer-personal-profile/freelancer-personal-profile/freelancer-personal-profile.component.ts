import { Component, OnInit } from '@angular/core';
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
  // display popups
  displayEditPopup: boolean = false;
  // track loading state
  isLoading: boolean = false;

  // inject services
  constructor(
    private freelancersService: FreelancersService,
    public notificationService: NotificationService,
    private route: ActivatedRoute
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
    this.selectedFreelancer = freelancer;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(freelancer: Freelancer) {
    if (!freelancer.id) {
      return;
    }

    this.deleteFreelancer(freelancer.id);
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

  // edit and delete profile data functionality
  editFreelancer(freelancer: Freelancer, id: number) {
    this.isLoading = true;

    this.freelancersService.editFreelancer(id, freelancer).subscribe({
      next: (data) => {
        this.notificationService.addMessage(
          'success',
          'Success',
          'Freelancer profile successfully updated!'
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
          'Freelancer profile could not be updated! Please retry.'
        );
        this.isLoading = false;
      },
    });
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

  ngOnInit(): void {
    // fetch freelancer data when component loads
    this.fetchFreelancer(1);
  }
}
