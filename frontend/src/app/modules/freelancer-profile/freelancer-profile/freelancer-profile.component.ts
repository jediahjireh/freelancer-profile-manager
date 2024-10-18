import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../../../types/types';
import { FreelancersService } from '../../../services/freelancers.service';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css',
})
export class FreelancerProfileComponent implements OnInit {
  freelancer!: Freelancer;
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

  ngOnInit(): void {
    // fetch the freelancer id from the route and use it to fetch the profile
    const freelancerId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchFreelancer(freelancerId);
  }
}
