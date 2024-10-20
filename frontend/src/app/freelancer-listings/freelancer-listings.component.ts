import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FreelancersService } from '../services/freelancers.service';
import { FreelancerComponent } from '../components/freelancer-listing-card/freelancer/freelancer.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { Freelancer, Freelancers } from '../types/types';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { MessagesModule } from 'primeng/messages';
import { NotificationService } from '../services/notification.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './freelancer-listings.component.html',
  styleUrl: './freelancer-listings.component.css',
})
export class FreelancerListingsComponent {
  // inject services
  constructor(
    private freelancersService: FreelancersService,
    public notificationService: NotificationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild('paginator') paginator: Paginator | undefined;
  freelancer!: Freelancer;
  freelancers: Freelancer[] = [];
  // search filter
  filteredFreelancers: Freelancer[] = [];
  searchQuery: string = '';

  // set item viewing quantities for display
  totalRecords: number = 0;
  rows: number = 8;
  // track paginator state
  currentPage: number = 0;
  // loading state
  isLoading: boolean = false;

  // display popup
  displayAddPopup: boolean = false;

  toggleAddPopup() {
    this.displayAddPopup = true;
    this.cdr.detectChanges();
  }

  selectedFreelancer: Freelancer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: '',
    isActive: false,
    profile: {
      id: 0,
      userId: 0,
      picture: '',
      jobTitle: '',
      description: '',
      hourlyRate: 0.0,
      bio: '',
      availability: '',
      city: '',
      state: '',
      country: '',
      skills: [],
      experiences: [],
      education: [],
      certifications: [],
      portfolioItems: [],
      reviews: [],
      socialLinks: [],
      createdAt: '',
      updatedAt: '',
    },
    subscription: {
      id: 0,
      plan: '',
      startDate: '',
      endDate: '',
      isActive: false,
    },
  };

  onConfirmAdd(freelancer: Freelancer) {
    // console.log('onConfirmAdd called');
    // console.log('freelancer:', freelancer);
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
    this.isLoading = true;

    this.freelancersService.getFreelancers({ page, perPage }).subscribe({
      next: (freelancers: Freelancers) => {
        // console.log(freelancers);
        this.freelancers = freelancers.freelancers;
        this.totalRecords = freelancers.total;
        // apply filter after fetching data
        this.filterFreelancers();
        this.isLoading = false;
      },
      error: (error) => {
        // console.log(error);
        this.notificationService.addMessage(
          'error',
          'Unsuccessful',
          'Freelancer profiles could not be fetched.'
        );
        this.isLoading = false;
      },
    });
  }

  // filter freelancers based on search query
  filterFreelancers() {
    if (this.searchQuery.trim() === '') {
      // display all active freelancer profiles if there is no search query
      this.filteredFreelancers = this.freelancers.filter(
        (freelancer) => freelancer.isActive && freelancer.role === 'freelancer'
      );
    } else {
      this.filteredFreelancers = this.freelancers.filter(
        (freelancer) =>
          // only display if freelancer account is active
          freelancer.isActive &&
          // role check
          freelancer.role === 'freelancer' &&
          (freelancer.firstName
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
            freelancer.profile.city
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            freelancer.username
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            freelancer.profile.description
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            freelancer.profile.bio
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            freelancer.profile.skills.some((skill) =>
              skill.level.toLowerCase().includes(this.searchQuery.toLowerCase())
            ) ||
            freelancer.profile.skills.some((skill) =>
              skill.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            ))
      );
    }
  }

  // add new freelancer
  addFreelancer(freelancer: Freelancer) {
    this.isLoading = true;

    this.freelancersService
      // pass the object
      .addFreelancer(freelancer)
      .subscribe({
        next: (data) => {
          // console.log('response:', data);
          this.notificationService.addMessage(
            'success',
            'Success',
            'New freelancer profile successfully added!'
          );
          // refresh data
          this.fetchFreelancers(this.currentPage, this.rows);
          // reset paginator
          this.resetPaginator();
          // change state
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.addMessage(
            'error',
            'Unsuccessful',
            'New freelancer profile could not be added! Please retry.'
          );
          this.isLoading = false;
        },
      });
  }

  // navigate to selected freelancer profile page
  viewFreelancerProfile(id: number | undefined) {
    // ensure freelancer profile exists
    if (id !== undefined) {
      this.router.navigate(['/freelancer-profile', id]);
    } else {
      this.notificationService.addMessage(
        'error',
        'Error',
        'Freelancer profile not found.'
      );
    }
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
