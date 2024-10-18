# Frontend

## Thought Process (checklist-form)

### Task 1

- [x] Generate freelancer-listings component
- [x] Set up Node.js server as a mock backend service
- [x] Freelancer profile page should be the default route
- [x] Generate api and freelancer services
- [x] Define freelancer data types
- [x] Generate layout: header and footer components
- [x] Paginator from PrimeNG
- [x] PrimeNG icons
- [x] Huge icons
- [x] Angular Material Card for freelancer profile display
- [x] PrimeNG Overlay Panel for action buttons
- [x] CRUD functionalities for freelancer profiles and data
- [x] Notification service
- [x] Clean card design
- [x] Responsive design
- [x] Search freelancer profiles
- [x] Form validation
- [x] Profile Manager Component
- [x] Add GET request to fetch a specific freelancer - backend
- [x] Add GET request to fetch a specific freelancer - frontend
- [x] Profile Page Module: Create freelancer profile page module and component - similarly to freelancer-listings but include the fetching of a specific freelancer from the get-go rather than all & NO add freelancer functionality should be implemented
- [x] Update routes to include freelancer profile page
- [x] Add pipe for retrieving the current year for footer display
- [x] Configure header for profile page
- [x] Refine 'Add Freelancer' floating button
- [x] Handle loading states gracefully - Angular Material Progress Spinner
- [x] Keep personal profile page card uniform so that freelancer is able to see what others see when coming across their profile
- [x] Use semantic HTML and maintain accessibility standards.

#### Design Choices (Task 1)

- My design choice for a clean but visually appealing interface reflects a focus on usability and aesthetics.
- A simple, uncluttered design ensures users can navigate the platform easily, while still enjoying a polished visual experience.
- Keeping the user profile page identical to the freelancer profile listing (but enlarged) allows for consistency, while ensuring that users see their profiles exactly as others do. This fosters transparency and allows users to both see and understand how they are represented to potential clients.
- Ultimately, the goal behind each element within the design was to create a cohesive experience, reinforcing trust and familiarity by sticking to interfaces and displays users may be accustomed to, while still throwing in personal effects and preferences throughout so that there is still a warmth that shines through (in an effort to showcase a little "personality").

### Task 2

- [x] Adapt the UI to display the selected freelancer on its own page using freelancer-profile
- [x] Separate the different parts of the profile into its own components (display the different parts as cards) - rendering and styling of elements now complete
- [x] Update the backend and UI to use the attributes found in the [freelancerProfile.json](/docs/freelancerProfile.json) file
- [x] Add a carousel animation for the portfolio
- [x] Create a component for skill and display the skill with stars or some other indicator you choose to show the skill level (1 = beginner, 2 = intermediate, 3 = expert) - use p-rating
- [ ] Set a default profile to be displayed and selected in the header tab for user data editing
- [ ] Allow the user to edit the data
- [ ] Check to make sure username does not exist before allowing user to add or edit username for their profile
- [ ] Remove white spaces from inputted data - .trim()
- [ ] Note that leaving the end date blank indicates that the time period is ongoing
- [ ] Update README.md screenshots
- [ ] Display similar profiles to the right of the freelancer personal profile cards
- [x] Portfolio vertical carousel on freelancer personal profile page

#### Design Choices (Task 2)

In conjunction to prior reasoning, LinkedIn's display for showcasing user profiles inspired the freelancer personal profile page display, in an effort to best adhere to industry standards, consistency and uniformity. A pop of colour was added for visual enhancement, while still harmonising with the neutral primary colours.

### Components to Separate

- [ ] Freelancer

  - [ ] id
  - [x] firstName
  - [x] lastName
  - [x] email
  - [x] username
  - [x] role - freelancer-listings checks role before display
  - [x] isActive - freelancer profile only displayed if account is active
  - [x] profile
  - [ ] subscription

- [x] Profile

  - [ ] id
  - [ ] userId
  - [x] picture
  - [x] jobTitle
  - [x] description
  - [x] hourlyRate
  - [x] bio
  - [x] availability
  - [x] city
  - [x] state
  - [x] country - South African freelancing platform
  - [x] skills
  - [x] experiences
  - [x] education
  - [x] certifications
  - [x] portfolioItems
  - [x] reviews
  - [x] socialLinks
  - [x] createdAt
  - [x] updatedAt

- [x] Skill

  - [ ] id
  - [x] name
  - [x] level

- [x] Experience

  - [ ] id
  - [x] company
  - [x] position
  - [x] startDate
  - [x] endDate
  - [x] description

- [x] Education

  - [ ] id
  - [x] institution
  - [x] degree
  - [x] fieldOfStudy
  - [x] startDate
  - [x] endDate

- [x] Certification

  - [ ] id
  - [x] name
  - [x] issuingOrganization
  - [x] issueDate
  - [x] expirationDate

- [x] PortfolioItem

  - [ ] id
  - [x] title
  - [x] description
  - [x] url

- [x] Review

  - [ ] id
  - [x] clientId
  - [x] rating
  - [x] comment
  - [x] createdAt

- [x] SocialLink

  - [ ] id
  - [x] platform
  - [x] url

- [ ] Subscription

  - [ ] id
  - [x] plan
  - [ ] startDate
  - [ ] endDate
  - [ ] isActive

Reminders for add, edit and delete freelancer data implementation:

- [ ] Set a default profile to be displayed and selected in the header tab for user data editing
- [ ] Allow the user to edit the data
- [ ] Check to make sure username does not exist before allowing user to add or edit username for their profile
- [ ] Remove white spaces from inputted data - .trim()
- [ ] Note that leaving the end date blank indicates that the time period is ongoing
- [ ] Display subscription details - plan, active status, start-and-end dates
- [ ] Mention that should a user have queries regarding their subscription to contact the appropriate given email address
