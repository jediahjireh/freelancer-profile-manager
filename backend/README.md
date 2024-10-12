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
  "freelancers": [
    {
      "id": 1,
      "profilePicture": "url_to_profile_picture",
      "name": "John Doe",
      "location": "Durban, Umhlanga",
      "hourlyRate": 150,
      "bio": "Experienced web developer specialising in Angular.",
      "skills": ["Angular", "TypeScript", "CSS"],
      "portfolio": [
        { "title": "Project 1", "link": "url_to_project_1" },
        { "title": "Project 2", "link": "url_to_project_2" }
      ],
      "socialLinks": {
        "linkedin": "url_to_linkedin",
        "github": "url_to_github"
      },
      "contact": { "email": "john.doe@example.com", "phone": "123-456-7890" }
    }
  ]
}
```

---
