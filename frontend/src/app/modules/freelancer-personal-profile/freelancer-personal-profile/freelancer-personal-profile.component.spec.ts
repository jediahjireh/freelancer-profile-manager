import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerPersonalProfileComponent } from './freelancer-personal-profile.component';

describe('FreelancerPersonalProfileComponent', () => {
  let component: FreelancerPersonalProfileComponent;
  let fixture: ComponentFixture<FreelancerPersonalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerPersonalProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerPersonalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
