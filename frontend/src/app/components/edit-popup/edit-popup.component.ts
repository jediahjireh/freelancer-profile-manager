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
import {
  Certification,
  Education,
  Experience,
  Freelancer,
  PortfolioItem,
  Review,
  Skill,
  SocialLink,
} from '../../types/types';
import { MessagesModule } from 'primeng/messages';
import { NotificationService } from '../../services/notification.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// values that may not be required must still be validated because so long as there is input, it should be valid data
interface FreelancerFormValues {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;

  profile: {
    id: number;
    userId: number;
    picture?: string;
    jobTitle?: string;
    description?: string;
    hourlyRate?: number;
    bio?: string;
    availability?: string;
    city?: string;
    state?: string;
    country?: string;
    skills?: Skill[];
    experiences?: Experience[];
    education?: Education[];
    certifications?: Certification[];
    portfolioItems?: PortfolioItem[];
    reviews?: Review[];
    socialLinks?: SocialLink[];
    createdAt: Date;
    updatedAt: Date;
  };
  subscription: {
    id: number;
    plan?: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
  };
}
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  // will be assigned before it is used
  freelancerForm!: FormGroup;
  // track form submission
  isSubmitted: boolean = false;
  // track loading state
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public notificationService: NotificationService
  ) {}

  // display popup or not
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  // header will ALWAYS have a value
  @Input() header = '';

  // freelancer input defaults
  @Input() freelancer: Freelancer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: '',
    isActive: true,

    profile: {
      id: 0,
      userId: 0,
      picture: '',
      jobTitle: '',
      description: '',
      hourlyRate: 0.0,
      bio: '',
      availability: '',
      city: '',
      state: '',
      country: '',
      skills: [],
      experiences: [],
      education: [],
      certifications: [],
      portfolioItems: [],
      reviews: [],
      socialLinks: [],
      createdAt: '',
      updatedAt: '',
    },
    subscription: {
      id: 0,
      plan: '',
      startDate: '',
      endDate: '',
      isActive: true,
    },
  };
  // confirm edits
  @Output() confirm = new EventEmitter<Freelancer>();

  // initialise the form
  ngOnInit(): void {
    this.loadFreelancerData();
    this.createFreelancerForm();
    this.loadProfileArray();

    /*
    console.log(this.freelancerForm.get('profile.socialLinks'));
    console.log(this.freelancerForm.get('profile.education.degree'));
    */
  }

  // sync form with input data
  ngOnChanges() {
    this.loadFreelancerData();

    if (this.freelancerForm) {
      this.freelancerForm.patchValue({
        id: this.freelancer.id,
        firstName: this.freelancer.firstName,
        lastName: this.freelancer.lastName,
        email: this.freelancer.email,
        username: this.freelancer.username,
        role: this.freelancer.role,
        isActive: this.freelancer.isActive,
        profile: {
          id: this.freelancer.profile.id,
          userId: this.freelancer.profile.userId,
          picture: this.freelancer.profile.picture,
          jobTitle: this.freelancer.profile.jobTitle,
          description: this.freelancer.profile.description,
          hourlyRate: this.freelancer.profile.hourlyRate,
          bio: this.freelancer.profile.bio,
          availability: this.freelancer.profile.availability,
          city: this.freelancer.profile.city,
          state: this.freelancer.profile.state,
          country: this.freelancer.profile.country,
        },
        subscription: {
          id: this.freelancer.subscription.id,
          plan: this.freelancer.subscription.plan,
          startDate: this.freelancer.subscription.startDate,
          endDate: this.freelancer.subscription.endDate,
          isActive: this.freelancer.subscription.isActive,
        },
      });
      // ensure to load arrays
      this.loadProfileArray();
    }
  }

  // loading state
  loadFreelancerData(): void {
    if (this.freelancer) {
      this.isLoading = true;
      this.createFreelancerForm();
      this.freelancerForm.patchValue(this.freelancer);
      this.loadProfileArray();
      this.isLoading = false;
    }
  }

  // button rather than checkbox to toggle between active or inactive profile state
  toggleActive(): void {
    const isActiveControl = this.freelancerForm.get('isActive');
    if (isActiveControl) {
      isActiveControl.setValue(!isActiveControl.value);
    }
  }

  // custom validator functions
  private portfolioItemsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const portfolioItems = control.value;

      // each portfolio item must have a title and link
      const allItemsValid = portfolioItems.every(
        (item: PortfolioItem) => item.title && item.url
      );

      return allItemsValid ? null : { portfolioItemsInvalid: true };
    };
  }

  private urlValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const urlPattern =
      // match standard and complex domains
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.[a-zA-Z]{2,}|([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?$/;
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
    if (controlName === 'portfolioItems' && this.portfolioItemsArray.invalid) {
      return 'Each portfolio item must have a title and valid link.';
    }
    if (controlName === 'url' && control?.hasError('invalidUrl')) {
      return 'Please enter a valid URL.';
    }

    return null;
  }

  // create form group
  createFreelancerForm(): void {
    this.freelancerForm = this.formBuilder.group({
      id: [this.freelancer.id],
      firstName: [this.freelancer.firstName, Validators.required],
      lastName: [this.freelancer.lastName, Validators.required],
      email: [this.freelancer.email, [Validators.required, Validators.email]],
      username: [this.freelancer.username],
      role: [this.freelancer.role],
      isActive: [this.freelancer.isActive],
      profile: this.formBuilder.group({
        id: [this.freelancer.profile.id],
        userId: [this.freelancer.profile.userId],
        picture: [this.freelancer.profile.picture],
        jobTitle: [this.freelancer.profile.jobTitle],
        description: [this.freelancer.profile.description],
        hourlyRate: [this.freelancer.profile.hourlyRate, Validators.required],
        bio: [this.freelancer.profile.bio],
        availability: [this.freelancer.profile.availability],
        city: [this.freelancer.profile.city],
        state: [this.freelancer.profile.state],
        country: [this.freelancer.profile.country],
        skills: this.formBuilder.array([]),
        experiences: this.formBuilder.array([]),
        education: this.formBuilder.array([]),
        certifications: this.formBuilder.array([]),
        portfolioItems: this.formBuilder.array([]),
        reviews: this.formBuilder.array([]),
        socialLinks: this.formBuilder.array([]),
      }),
      subscription: this.formBuilder.group({
        id: [this.freelancer.subscription.id],
        plan: [this.freelancer.subscription.plan],
        startDate: [this.freelancer.subscription.startDate],
        endDate: [this.freelancer.subscription.endDate],
        isActive: [this.freelancer.subscription.isActive],
      }),
    });
  }

  // load profile details into arrays
  loadProfileArray(): void {
    this.loadSkills();
    this.loadExperiences();
    this.loadEducation();
    this.loadCertifications();
    this.loadPortfolioItems();
    // this.loadReviews();
    this.loadSocialLinks();
  }

  // get portfolio form array for easy access
  get portfolioItemsArray(): FormArray {
    return this.freelancerForm.get('profile.portfolioItems') as FormArray;
  }

  // load existing portfolio items
  loadPortfolioItems() {
    // make sure freelancer is defined
    if (!this.freelancer) {
      return;
    }

    const portfolioItemsArray = this.portfolioItemsArray;
    // clear existing items
    portfolioItemsArray.clear();
    this.freelancer.profile.portfolioItems.forEach((item) => {
      portfolioItemsArray.push(this.createPortfolioItem(item));
    });
  }

  // create a new portfolio item form group
  createPortfolioItem(item: PortfolioItem): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      title: [item.title],
      description: [item.description],
      url: [item.url],
    });
  }

  // add a new portfolio item
  addPortfolioItem() {
    const portfolioItemsArray = this.portfolioItemsArray;
    portfolioItemsArray.push(
      this.createPortfolioItem({
        id: portfolioItemsArray.length + 1,
        title: '',
        description: '',
        url: '',
      })
    );
  }

  // remove a portfolio item
  removePortfolioItem(index: number) {
    const portfolioItemsArray = this.portfolioItemsArray;
    portfolioItemsArray.removeAt(index);
  }

  // experiences array

  // get experiences form array for easy access
  get experiencesArray(): FormArray {
    return this.freelancerForm.get('profile.experiences') as FormArray;
  }

  // load existing experiences
  loadExperiences() {
    if (!this.freelancer) {
      return;
    }

    const experiencesArray = this.experiencesArray;
    experiencesArray.clear();
    this.freelancer.profile.experiences.forEach((item) => {
      experiencesArray.push(this.createExperience(item));
    });
  }

  // create a new experience form group
  createExperience(item: Experience): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      company: [item.company],
      position: [item.position],
      startDate: [item.startDate],
      endDate: [item.endDate],
      description: [item.description],
    });
  }

  // add a new experience
  addExperience() {
    const experiencesArray = this.experiencesArray;
    experiencesArray.push(
      this.createExperience({
        id: experiencesArray.length + 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      })
    );
  }

  // remove an experience
  removeExperience(index: number) {
    const experiencesArray = this.experiencesArray;
    experiencesArray.removeAt(index);
  }

  // education array

  // get education form array for easy access
  get educationArray(): FormArray {
    return this.freelancerForm.get('profile.education') as FormArray;
  }

  // load existing education
  loadEducation() {
    if (!this.freelancer) {
      return;
    }

    const educationArray = this.educationArray;
    educationArray.clear();
    this.freelancer.profile.education.forEach((item) => {
      educationArray.push(this.createEducation(item));
    });
  }

  // create a new education form group
  createEducation(item: Education): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      institution: [item.institution],
      degree: [item.degree],
      fieldOfStudy: [item.fieldOfStudy],
      startDate: [item.startDate],
      endDate: [item.endDate],
    });
  }

  // add a new education
  addEducation() {
    const educationArray = this.educationArray;
    educationArray.push(
      this.createEducation({
        id: educationArray.length + 1,
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
      })
    );
  }

  // remove an education
  removeEducation(index: number) {
    const educationArray = this.educationArray;
    educationArray.removeAt(index);
  }

  // certifications array

  // get certifications form array for easy access
  get certificationsArray(): FormArray {
    return this.freelancerForm.get('profile.certifications') as FormArray;
  }

  // load existing certifications
  loadCertifications() {
    if (!this.freelancer) {
      return;
    }

    const certificationsArray = this.certificationsArray;
    certificationsArray.clear();
    this.freelancer.profile.certifications.forEach((item) => {
      certificationsArray.push(this.createCertification(item));
    });
  }

  // create a new certification form group
  createCertification(item: Certification): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      issuingOrganization: [item.issuingOrganization],
      issueDate: [item.issueDate],
      expirationDate: [item.expirationDate],
    });
  }

  // add a new certification
  addCertification() {
    const certificationsArray = this.certificationsArray;
    certificationsArray.push(
      this.createCertification({
        id: certificationsArray.length + 1,
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expirationDate: '',
      })
    );
  }

  // remove a certification
  removeCertification(index: number) {
    const certificationsArray = this.certificationsArray;
    certificationsArray.removeAt(index);
  }

  // social links array

  // get social links form array for easy access
  get socialLinksArray(): FormArray {
    return this.freelancerForm.get('profile.socialLinks') as FormArray;
  }

  // load existing social links
  loadSocialLinks() {
    if (!this.freelancer) {
      return;
    }

    const socialLinksArray = this.socialLinksArray;
    socialLinksArray.clear();
    this.freelancer.profile.socialLinks.forEach((item) => {
      socialLinksArray.push(this.createSocialLink(item));
    });
  }

  // create a new social link form group
  createSocialLink(item: SocialLink): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      platform: [item.platform],
      url: [item.url],
    });
  }

  // add a new social link
  addSocialLink() {
    const socialLinksArray = this.socialLinksArray;
    socialLinksArray.push(
      this.createSocialLink({
        id: socialLinksArray.length + 1,
        platform: '',
        url: '',
      })
    );
  }

  // remove a social link
  removeSocialLink(index: number) {
    const socialLinksArray = this.socialLinksArray;
    socialLinksArray.removeAt(index);
  }

  // skills array

  // get skills form array for easy access
  get skillsArray(): FormArray {
    return this.freelancerForm.get('profile.skills') as FormArray;
  }

  // load existing skills
  loadSkills() {
    if (!this.freelancer) {
      return;
    }

    const skillsArray = this.skillsArray;
    skillsArray.clear();
    this.freelancer.profile.skills.forEach((item) => {
      skillsArray.push(this.createSkill(item));
    });
  }

  // create a new skill form group
  createSkill(item: Skill): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      level: [item.level],
    });
  }

  // add a new skill
  addSkill() {
    const skillsArray = this.skillsArray;
    skillsArray.push(
      this.createSkill({
        id: skillsArray.length + 1,
        name: '',
        level: '',
      })
    );
  }

  // remove a skill
  removeSkill(index: number) {
    const skillsArray = this.skillsArray;
    skillsArray.removeAt(index);
  }

  // emit freelancer form values on confirm (form submission)
  onConfirm(): void {
    /* debugging
    console.log('onConfirm called');
    console.log('freelancerForm.value:', this.freelancerForm.value);
    console.log(
      'freelancerForm.getRawValue():',
      this.freelancerForm.getRawValue()
    );
    console.log('freelancer:', this.freelancer);
    */

    // trigger invalid data input messages
    this.isSubmitted = true;

    if (this.freelancerForm.invalid) {
      this.notificationService.addMessage(
        'error',
        'Invalid',
        'Please recheck your input as it is currently invalid.'
      );
      return;
    }

    // get raw form values without any validation as they are nested
    const freelancerFormValues = this.freelancerForm.getRawValue();
    const profileValues = freelancerFormValues.profile;
    const subscriptionValues = freelancerFormValues.subscription;

    const freelancer: Freelancer = {
      id: this.freelancer.id,
      firstName: freelancerFormValues.firstName,
      lastName: freelancerFormValues.lastName,
      email: freelancerFormValues.email,
      username: freelancerFormValues.username,
      role: freelancerFormValues.role,
      isActive: freelancerFormValues.isActive,
      profile: {
        id: this.freelancer.profile.id,
        userId: this.freelancer.id,
        picture: profileValues.picture,
        jobTitle: profileValues.jobTitle,
        description: profileValues.description,
        hourlyRate: profileValues.hourlyRate,
        bio: profileValues.bio,
        availability: profileValues.availability,
        city: profileValues.city,
        state: profileValues.state,
        country: profileValues.country,
        skills: this.skillsArray.value,
        experiences: this.experiencesArray.value,
        education: this.educationArray.value,
        certifications: this.certificationsArray.value,
        portfolioItems: this.portfolioItemsArray.value,
        reviews: this.freelancer.profile.reviews,
        socialLinks: this.socialLinksArray.value,
        createdAt: this.freelancer.profile.createdAt,
        updatedAt: new Date().toISOString(),
      },
      subscription: {
        id: this.freelancer.subscription.id,
        plan: subscriptionValues.plan,
        startDate: subscriptionValues.startDate,
        endDate: subscriptionValues.endDate,
        isActive: subscriptionValues.isActive,
      },
    };

    // update the freelancer property
    this.freelancer = freelancer;

    /*
    console.log(this.freelancer);
    console.log({ ...freelancer });
    */

    // emit new or updated values
    this.confirm.emit({ ...freelancer });

    // close dialog
    this.display = false;
    this.displayChange.emit(this.display);
    this.isSubmitted = false;
  }

  // cancel changes
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.isSubmitted = false;
  }
}
