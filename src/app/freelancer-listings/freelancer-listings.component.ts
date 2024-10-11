import { Component, ViewChild } from '@angular/core';
import { FreelancersService } from '../services/freelancers.service';
import { FreelancerComponent } from '../components/freelancer/freelancer.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { Freelancer, Freelancers } from '../types/types';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';

@Component({
  selector: 'app-freelancer-listings',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    ButtonModule,
    EditPopupComponent,
    FreelancerComponent,
  ],
  templateUrl: './freelancer-listings.component.html',
  styleUrl: './freelancer-listings.component.css',
})
export class FreelancerListingsComponent {
  constructor(private freelancersService: FreelancersService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  freelancers: Freelancer[] = [];

  // set item viewing quantities for display
  totalRecords: number = 0;
  rows: number = 8;

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
    this.fetchFreelancers(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchFreelancers(page: number, perPage: number) {
    this.freelancersService
      // fetch freelancers from backend
      .getFreelancers('http://localhost:3000/freelancers', {
        page,
        perPage,
      })
      .subscribe({
        next: (freelancers: Freelancers) => {
          // loop through array
          this.freelancers = freelancers.freelancers;
          this.totalRecords = freelancers.total;
          console.log('Freelancers fetched:', freelancers);
        },
        error: (error) => {
          console.error('Error fetching freelancers:', error);
        },
      });
  }

  // CRUD functions
  editFreelancer(freelancer: Freelancer, id: number) {
    this.freelancersService
      .editFreelancer(`http://localhost:3000/freelancers/${id}`, freelancer)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteFreelancer(id: number) {
    this.freelancersService
      .deleteFreelancer(`http://localhost:3000/freelancers/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          // fetch data from server and update state
          this.fetchFreelancers(0, this.rows);
          // reset paginator
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addFreelancer(freelancer: Freelancer) {
    this.freelancersService
      .addFreelancer(`http://localhost:3000/freelancers`, freelancer)
      .subscribe({
        next: (data) => {
          console.log(data);
          // fetch data from server and update state
          this.fetchFreelancers(0, this.rows);
          // reset paginator
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchFreelancers(0, this.rows);
  }
}
