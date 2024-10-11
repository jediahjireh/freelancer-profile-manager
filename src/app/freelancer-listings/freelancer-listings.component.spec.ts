import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerListingsComponent } from './freelancer-listings.component';

describe('FreelancerListingsComponent', () => {
  let component: FreelancerListingsComponent;
  let fixture: ComponentFixture<FreelancerListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
