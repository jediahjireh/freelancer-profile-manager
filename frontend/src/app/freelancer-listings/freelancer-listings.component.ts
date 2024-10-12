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
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

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
    InputGroupModule,
    InputGroupAddonModule,
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
  // search filter
  filteredFreelancers: Freelancer[] = [];
  searchQuery: string = '';

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

  // fetch data from server and filter the list based on search
  fetchFreelancers(
    page: number = this.currentPage,
    perPage: number = this.rows
  ) {
    this.freelancersService.getFreelancers({ page, perPage }).subscribe({
      next: (freelancers: Freelancers) => {
        this.freelancers = freelancers.freelancers;
        this.totalRecords = freelancers.total;
        // apply filter after fetching data
        this.filterFreelancers();
      },
      error: (error) => {
        this.notificationService.addMessage(
          'error',
          'Unsuccessful',
          'Freelancer profiles could not be fetched.'
        );
      },
    });
  }

  // filter freelancers based on search query
  filterFreelancers() {
    if (this.searchQuery.trim() === '') {
      // display all freelancers if there is no search query
      this.filteredFreelancers = this.freelancers;
    } else {
      this.filteredFreelancers = this.freelancers.filter(
        (freelancer) =>
          // filter by name, location, bio or skills array
          freelancer.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          freelancer.location
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          freelancer.bio
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
      );
    }
  }

  // CRUD functions
  editFreelancer(freelancer: Freelancer, id: number) {
    this.freelancersService.editFreelancer(id, freelancer).subscribe({
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
          'Unsuccessful',
          'Freelancer profile could not be updated! Please retry.'
        );
      },
    });
  }

  deleteFreelancer(id: number) {
    this.freelancersService.deleteFreelancer(id).subscribe({
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
          'Unsuccessful',
          'Freelancer profile could not be deleted! Please retry.'
        );
      },
    });
  }

  addFreelancer(freelancer: Freelancer) {
    this.freelancersService
      // pass the object
      .addFreelancer(freelancer)
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
            'Unsuccessful',
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
    // filter results
    this.filterFreelancers();
  }
}
