import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerFooterComponent } from './freelancer-footer.component';

describe('FreelancerFooterComponent', () => {
  let component: FreelancerFooterComponent;
  let fixture: ComponentFixture<FreelancerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FreelancerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
