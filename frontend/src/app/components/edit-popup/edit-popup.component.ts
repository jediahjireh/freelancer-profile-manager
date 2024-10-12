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
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Freelancer, PortfolioItem } from '../../types/types';
import { MessagesModule } from 'primeng/messages';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  // will be assigned before it is used
  freelancerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public notificationService: NotificationService
  ) {}

  // track form submission
  submitted: boolean = false;

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

  // custom validator functions
  private portfolioItemsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const portfolioItems = control.value;

      // each portfolio item must have a title and link
      const allItemsValid = portfolioItems.every(
        (item: PortfolioItem) => item.title && item.link
      );

      return allItemsValid ? null : { portfolioItemsInvalid: true };
    };
  }

  private phoneValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    // accept international and local formats with spaces, hyphens or parentheses as separators
    const phonePattern =
      /^(\+?\d{1,3}|\(?\d{1,4}\)?)([\s-]?(\(\d{1,4}\)|\d{1,4}))([\s-]?\d{1,4}){1,3}$/;
    const phoneValue = control.value;

    // invalid if less than 10 digits
    if (phoneValue && phoneValue.replace(/\D/g, '').length < 10) {
      return { invalidPhone: true };
    }

    return phonePattern.test(phoneValue) ? null : { invalidPhone: true };
  }

  private urlValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+)\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return urlPattern.test(control.value) ? null : { invalidUrl: true };
  }

  // check for errors
  public getErrorMessage(controlName: string): string | null {
    const control = this.freelancerForm.get(controlName);

    // validation status
    if (control?.hasError('required')) {
      const formattedName = controlName
        // add space before each uppercase letter in variable
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase()
        // capitalise first letter
        .replace(/^./, (match) => match.toUpperCase());

      return `${formattedName} is required.`;
    }
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (controlName === 'phone' && control?.hasError('invalidPhone')) {
      return 'Please enter a valid phone number.';
    }
    if (controlName === 'portfolio' && this.portfolioArray.invalid) {
      return 'Each portfolio item must have a title and valid link.';
    }
    if (controlName === 'linkedin' && control?.hasError('invalidUrl')) {
      return 'Please enter a valid LinkedIn URL.';
    }
    if (controlName === 'github' && control?.hasError('invalidUrl')) {
      return 'Please enter a valid GitHub URL.';
    }
    return null;
  }

  // initialise form
  ngOnInit() {
    this.freelancerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      profilePicture: [''],
      location: ['', [Validators.required]],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
      bio: ['', [Validators.required]],
      // make a string for input field then split into an array
      skills: ['', [Validators.required]],
      linkedin: ['', [Validators.required, this.urlValidator]],
      github: ['', [Validators.required, this.urlValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      // custom validator
      portfolio: this.formBuilder.array([], this.portfolioItemsValidator()),
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
      link: [item.link, [Validators.required, this.urlValidator]],
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
    // notify user of invalid fields
    this.submitted = true;
    console.log('Form controls:', this.freelancerForm.controls);
    for (const controlName in this.freelancerForm.controls) {
      const control = this.freelancerForm.get(controlName);
      console.log(`${controlName} status:`, control?.status);
      console.log(`${controlName} errors:`, control?.errors);
    }
    // check if input is valid
    if (this.freelancerForm.invalid || this.portfolioArray.invalid) {
      this.notificationService.addMessage(
        'error',
        'Invalid',
        'Please fill in all required fields.'
      );
      return;
    }

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
      profilePicture:
        profilePicture || '/images/freelancers/default-profile-picture.png',
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
  }

  // cancel edits
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
