import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileElementsComponent } from './profile-elements.component';

describe('ProfileElementsComponent', () => {
  let component: ProfileElementsComponent;
  let fixture: ComponentFixture<ProfileElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileElementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
