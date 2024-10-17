import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerActionsComponent } from './freelancer-actions.component';

describe('FreelancerActionsComponent', () => {
  let component: FreelancerActionsComponent;
  let fixture: ComponentFixture<FreelancerActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
