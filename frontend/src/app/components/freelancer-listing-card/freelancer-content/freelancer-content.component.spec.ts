import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerContentComponent } from './freelancer-content.component';

describe('FreelancerContentComponent', () => {
  let component: FreelancerContentComponent;
  let fixture: ComponentFixture<FreelancerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
