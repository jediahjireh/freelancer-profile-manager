# Freelancer Profile Manager - Node.js Server (Mock Backend Service)

This server provides the backend functionality for the **Freelancer Profile Manager** (Angular frontend), allowing users to perform CRUD (Create, Read, Update, Delete) operations on freelancer profiles. The server is built using **Express.js** and interacts with a [JSON file](/freelancers.json) for data management.

## Table of Contents

- [Freelancer Profile Manager - Node.js Server (Mock Backend Service)](#freelancer-profile-manager---nodejs-server-mock-backend-service)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Custom JSON Structure](#custom-json-structure)

## Features

- **Express.js Server:** A robust and scalable backend built with Express.js.
- **CRUD Operations:** Supports Create, Read, Update and Delete operations on freelancer profile data.
- **JSON Data Storage:** Freelancer data is stored and manipulated within a JSON file.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```zsh
   git clone https://github.com/jediahjireh/freelancer-profile-manager.git
   ```

2. Navigate to the backend directory:

   ```zsh
   cd freelancer-profile-manager/backend
   ```

3. Install dependencies:

   ```zsh
   npm install
   ```

## Usage

1. Run the server:

   ```zsh
   npm start
   ```

2. The server will be running on the [default localhost](http://localhost:3000/).

3. The Angular frontend will interact with these API endpoints to perform CRUD operations on freelancer profiles.

## Custom JSON Structure

Here is the structure of the custom JSON file used for managing freelancer data:

```json
{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com",
  "username": "janedoe_dev",
  "role": "freelancer",
  "is_active": true,
  "profile": {
    "id": 1,
    "user_id": 1,
    "job_title": "Full Stack Developer",
    "description": "Experienced full stack developer specializing in React and Django",
    "hourly_rate": 75.0,
    "bio": "I'm a passionate developer with 5 years of experience in building scalable web applications.",
    "availability": "Part-time",
    "city": "San Francisco",
    "state": "California",
    "country": "United States",
    "skills": [
      {
        "id": 1,
        "name": "React",
        "level": "Expert"
      },
      {
        "id": 2,
        "name": "Django",
        "level": "Expert"
      },
      {
        "id": 3,
        "name": "PostgreSQL",
        "level": "Intermediate"
      }
    ],
    "experiences": [
      {
        "id": 1,
        "company": "Tech Innovators Inc.",
        "position": "Senior Developer",
        "start_date": "2018-03-01",
        "end_date": "2023-05-31",
        "description": "Led a team of developers in creating a cloud-based project management tool."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "University of California, Berkeley",
        "degree": "Bachelor of Science",
        "field_of_study": "Computer Science",
        "start_date": "2010-09-01",
        "end_date": "2014-05-31"
      }
    ],
    "certifications": [
      {
        "id": 1,
        "name": "AWS Certified Developer - Associate",
        "issuing_organization": "Amazon Web Services",
        "issue_date": "2022-01-15",
        "expiration_date": "2025-01-15"
      }
    ],
    "portfolio_items": [
      {
        "id": 1,
        "title": "E-commerce Platform",
        "description": "Developed a fully functional e-commerce platform using React and Django",
        "url": "https://github.com/janedoe/ecommerce-platform"
      }
    ],
    "reviews": [
      {
        "id": 1,
        "client_id": 5,
        "rating": 5,
        "comment": "Jane is an excellent developer. She delivered the project on time and exceeded our expectations.",
        "created_at": "2023-04-15T14:30:00Z"
      }
    ],
    "social_links": [
      {
        "id": 1,
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/janedoe"
      },
      {
        "id": 2,
        "platform": "GitHub",
        "url": "https://github.com/janedoe"
      }
    ],
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-06-15T12:30:00Z"
  },
  "subscription": {
    "id": 1,
    "plan": "Professional",
    "start_date": "2023-01-01",
    "end_date": "2024-01-01",
    "is_active": true
  }
}
```

Based on template given in [freelancerProfile.json](/docs/freelancerProfile.json)

---
