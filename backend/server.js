// import express module
import express from "express";
// import file system module
import fs from "fs";
// import cors module
import cors from "cors";

const app = express();
const port = 3000;

// cors configuration - allow requests from frontend (http://localhost:4200) | https://freelancer-profile-manager.vercel.app
const corsOptions = {
  origin: " https://freelancer-profile-manager.vercel.app",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// cors middleware
app.use(cors(corsOptions));

// express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// GET request - get all the freelancers
app.get("/freelancers", (req, res) => {
  // extract query parameters for pagination or set default values (localhost:3000/freelancers?page=0&perPage=10)
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  fs.readFile("freelancers.json", "utf8", (err, data) => {
    // log errors
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    // parse the data from the file into JSON format
    const jsonData = JSON.parse(data);

    // calculate indexes for slicing the data
    const start = page * perPage;
    const end = start + perPage;

    // split array based on pagination settings
    const result = jsonData.freelancers.slice(start, end);

    // send sliced data and pagination details
    res.status(200).json({
      freelancers: result,
      total: jsonData.freelancers.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.freelancers.length / perPage),
    });
  });
});

// POST request - add a new freelancer
app.post("/freelancers", (req, res) => {
  // destructure freelancer details
  const {
    firstName,
    lastName,
    email,
    username,
    role,
    isActive,
    profile,
    subscription,
  } = req.body;

  fs.readFile("freelancers.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const jsonData = JSON.parse(data);

    // find max id from existing data and assign unique id to new freelancer
    const maxId = jsonData.freelancers.reduce(
      (max, freelancer) => Math.max(max, freelancer.id),
      0
    );

    // create new freelancer object
    const newFreelancer = {
      id: maxId + 1,
      firstName,
      lastName,
      email,
      username,
      role,
      isActive,
      profile: {
        id: maxId + 1,
        userId: maxId + 1,
        picture: profile.picture,
        jobTitle: profile.jobTitle,
        description: profile.description,
        hourlyRate: profile.hourlyRate,
        bio: profile.bio,
        availability: profile.availability,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        skills: profile.skills || [],
        experiences: profile.experiences || [],
        education: profile.education || [],
        certifications: profile.certifications || [],
        portfolioItems: profile.portfolioItems || [],
        reviews: profile.reviews || [],
        socialLinks: profile.socialLinks || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      subscription: {
        id: maxId + 1,
        plan: subscription.plan,
        startDate: new Date(),
        endDate: subscription.endDate,
        isActive: subscription.isActive,
      },
    };

    jsonData.freelancers.push(newFreelancer);

    fs.writeFile("freelancers.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).json(newFreelancer);
    });
  });
});

// PUT request - update/edit a freelancer's data
app.put("/freelancers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    firstName,
    lastName,
    email,
    username,
    role,
    isActive,
    profile,
    subscription,
  } = req.body;

  fs.readFile("freelancers.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    // find index of freelancer to be updated
    const index = jsonData.freelancers.findIndex(
      (freelancer) => freelancer.id === id
    );

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    // update the freelancer's data
    jsonData.freelancers[index] = {
      id,
      firstName,
      lastName,
      email,
      username,
      role,
      isActive,
      profile: {
        id: profile.id,
        userId: profile.userId,
        picture: profile.picture,
        jobTitle: profile.jobTitle,
        description: profile.description,
        hourlyRate: profile.hourlyRate,
        bio: profile.bio,
        availability: profile.availability,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        skills: profile.skills || [],
        experiences: profile.experiences || [],
        education: profile.education || [],
        certifications: profile.certifications || [],
        portfolioItems: profile.portfolioItems || [],
        reviews: profile.reviews || [],
        socialLinks: profile.socialLinks || [],
        createdAt: profile.createdAt,
        updatedAt: new Date(),
      },

      subscription: {
        id,
        plan: subscription.plan,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        isActive: subscription.isActive,
      },
    };

    fs.writeFile("freelancers.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(200).json(jsonData.freelancers[index]);
    });
  });
});

// DELETE request - delete a freelancer and their data
app.delete("/freelancers/:id", (req, res) => {
  // convert freelancer id to integer (localhost:3000/freelancers/5)
  const id = parseInt(req.params.id);

  fs.readFile("freelancers.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    // find index of freelancer profile to be removed
    const index = jsonData.freelancers.findIndex(
      (freelancer) => freelancer.id === id
    );

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    jsonData.freelancers.splice(index, 1);

    fs.writeFile("freelancers.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(204).send();
    });
  });
});

// GET request - fetch a specific freelancer's data
app.get("/freelancers/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("freelancers.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    // find freelancer by id
    const freelancer = jsonData.freelancers.find(
      (freelancer) => freelancer.id === id
    );

    if (!freelancer) {
      res.status(404).send("Freelancer not found");
      return;
    }

    // send freelancer data
    res.status(200).json(freelancer);
  });
});

// start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
