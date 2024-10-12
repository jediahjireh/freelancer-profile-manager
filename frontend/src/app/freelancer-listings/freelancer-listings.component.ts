import { Component, ViewChild } from '@angular/core';
import { FreelancersService } from '../services/freelancers.service';
import { FreelancerComponent } from '../components/freelancer/freelancer.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { Freelancer, Freelancers } from '../types/types';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { MessagesModule } from 'primeng/messages';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-freelancer-listings',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    ButtonModule,
    EditPopupComponent,
    FreelancerComponent,
    MessagesModule,
  ],
  templateUrl: './freelancer-listings.component.html',
  styleUrl: './freelancer-listings.component.css',
})
export class FreelancerListingsComponent {
  // inject services
  constructor(
    private freelancersService: FreelancersService,
    public notificationService: NotificationService
  ) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  freelancers: Freelancer[] = [];

  // set item viewing quantities for display
  totalRecords: number = 0;
  rows: number = 8;
  // track paginator state
  currentPage: number = 0;

  // display popups
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  // toggle displays
  toggleEditPopup(freelancer: Freelancer) {
    this.selectedFreelancer = freelancer;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(freelancer: Freelancer) {
    if (!freelancer.id) {
      return;
    }

    this.deleteFreelancer(freelancer.id);
  }

  selectedFreelancer: Freelancer = {
    id: 0,
    profilePicture: '',
    name: '',
    location: '',
    hourlyRate: 0,
    bio: '',
    skills: [],
    portfolio: [],
    socialLinks: {
      linkedin: '',
      github: '',
    },
    contact: {
      email: '',
      phone: '',
    },
  };

  // confirmation logic
  onConfirmEdit(freelancer: Freelancer) {
    // do not invoke method if freelancer cannot be found
    if (!this.selectedFreelancer.id) {
      return;
    }

    this.editFreelancer(freelancer, this.selectedFreelancer.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(freelancer: Freelancer) {
    this.addFreelancer(freelancer);
    this.displayAddPopup = false;
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.fetchFreelancers(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  // fetch data from server
  fetchFreelancers(
    page: number = this.currentPage,
    perPage: number = this.rows
  ) {
    this.freelancersService
      // fetch freelancers from backend
      .getFreelancers('http://localhost:3000/freelancers', {
        page,
        perPage,
      })
      .subscribe({
        // triggered when data is successfully received from the server
        next: (freelancers: Freelancers) => {
          // loop through freelancers array
          this.freelancers = freelancers.freelancers;
          this.totalRecords = freelancers.total;
          // console.log('Freelancers fetched successfully.');
        },
        error: (error) => {
          // console.error('Error fetching freelancers:', error);
          this.notificationService.addMessage(
            'error',
            'Error',
            'An error occurred while fetching freelancer profiles to display! Please retry.'
          );
        },
        /*
        complete: () => {
          console.log('Fetch operation complete.');
        },
        */
      });
  }

  // CRUD functions
  editFreelancer(freelancer: Freelancer, id: number) {
    this.freelancersService
      .editFreelancer(`http://localhost:3000/freelancers/${id}`, freelancer)
      .subscribe({
        next: (data) => {
          this.notificationService.addMessage(
            'success',
            'Success',
            'Freelancer profile successfully updated!'
          );
          // refresh current page of freelancer display list
          this.fetchFreelancers(this.currentPage, this.rows);
        },
        error: (error) => {
          // console.error(error);
          this.notificationService.addMessage(
            'error',
            'Failure',
            'Freelancer profile could not be updated! Please retry.'
          );
        },
      });
  }

  deleteFreelancer(id: number) {
    this.freelancersService
      .deleteFreelancer(`http://localhost:3000/freelancers/${id}`)
      .subscribe({
        next: (data) => {
          this.notificationService.addMessage(
            'success',
            'Success',
            'Freelancer profile successfully removed!'
          );
          // refresh data
          this.fetchFreelancers(this.currentPage, this.rows);
          // reset paginator
          this.resetPaginator();
        },
        error: (error) => {
          // console.error(error);
          this.notificationService.addMessage(
            'error',
            'Failure',
            'Freelancer profile could not be deleted! Please retry.'
          );
        },
      });
  }

  addFreelancer(freelancer: Freelancer) {
    this.freelancersService
      .addFreelancer(`http://localhost:3000/freelancers`, freelancer)
      .subscribe({
        next: (data) => {
          this.notificationService.addMessage(
            'success',
            'Success',
            'New freelancer profile successfully added!'
          );
          // refresh data
          this.fetchFreelancers(this.currentPage, this.rows);
          // reset paginator
          this.resetPaginator();
        },
        error: (error) => {
          this.notificationService.addMessage(
            'error',
            'Failure',
            'New freelancer profile could not be added! Please retry.'
          );
        },
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // fetch data from server
    this.fetchFreelancers(this.currentPage, this.rows);
  }
}
