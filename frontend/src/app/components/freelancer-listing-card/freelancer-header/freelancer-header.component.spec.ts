import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerHeaderComponent } from './freelancer-header.component';

describe('FreelancerHeaderComponent', () => {
  let component: FreelancerHeaderComponent;
  let fixture: ComponentFixture<FreelancerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
