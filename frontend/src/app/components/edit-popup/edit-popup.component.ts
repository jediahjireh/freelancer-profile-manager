import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Freelancer, PortfolioItem } from '../../types/types';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  // will be assigned before it is used
  freelancerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  // display popup or not
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  // header will ALWAYS have a value
  @Input() header!: string;

  // freelancer input defaults
  @Input() freelancer: Freelancer = {
    name: '',
    profilePicture: '',
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

  // confirm edits
  @Output() confirm = new EventEmitter<Freelancer>();

  // initialise form in ngOnInit
  ngOnInit() {
    this.freelancerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      profilePicture: [''],
      location: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      // make a string for input field then split into an array
      skills: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      github: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      // initialise portfolio items as a FormArray
      portfolio: this.formBuilder.array([]),
    });
    this.loadPortfolioItems();
  }

  // get portfolio form array for easy access
  get portfolioArray(): FormArray {
    return this.freelancerForm.get('portfolio') as FormArray;
  }

  // load existing portfolio items
  loadPortfolioItems() {
    const portfolioArray = this.portfolioArray;
    // clear existing items
    portfolioArray.clear();
    this.freelancer.portfolio.forEach((item) => {
      portfolioArray.push(this.createPortfolioItem(item));
    });
  }

  // create a new portfolio item form group
  createPortfolioItem(item: PortfolioItem): FormGroup {
    return this.formBuilder.group({
      title: [item.title, [Validators.required]],
      link: [item.link, [Validators.required]],
    });
  }

  // add a new portfolio item
  addPortfolioItem() {
    const portfolioArray = this.portfolioArray;
    portfolioArray.push(this.createPortfolioItem({ title: '', link: '' }));
  }

  // remove a portfolio item
  removePortfolioItem(index: number) {
    const portfolioArray = this.portfolioArray;
    portfolioArray.removeAt(index);
  }

  // sync form with input data
  ngOnChanges() {
    if (this.freelancerForm) {
      this.freelancerForm.patchValue({
        name: this.freelancer.name,
        profilePicture: this.freelancer.profilePicture,
        location: this.freelancer.location,
        hourlyRate: this.freelancer.hourlyRate,
        bio: this.freelancer.bio,
        // convert array to comma-separated string
        skills: this.freelancer.skills.join(', '),
        linkedin: this.freelancer.socialLinks.linkedin,
        github: this.freelancer.socialLinks.github,
        email: this.freelancer.contact.email,
        phone: this.freelancer.contact.phone,
      });

      // load portfolio items when freelancer changes
      this.loadPortfolioItems();
    }
  }

  // emit freelancer form values on confirm
  onConfirm() {
    const {
      name,
      profilePicture,
      location,
      hourlyRate,
      bio,
      skills,
      linkedin,
      github,
      email,
      phone,
      // get portfolio array of values
      portfolio,
    } = this.freelancerForm.value;

    // emit the updated freelancer data
    this.confirm.emit({
      name: name || '',
      profilePicture: profilePicture || '',
      location: location || '',
      hourlyRate: hourlyRate || 0,
      bio: bio || '',
      // convert string back to array
      skills: skills.split(',').map((skill: string) => skill.trim()),
      portfolio: portfolio,
      socialLinks: {
        linkedin: linkedin || '',
        github: github || '',
      },
      contact: {
        email: email || '',
        phone: phone || '',
      },
    });

    // close dialog
    this.display = false;
    this.displayChange.emit(this.display);

    // reload the page after confirmation
    window.location.reload();
  }

  // cancel edits
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
