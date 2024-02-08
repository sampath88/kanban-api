require("dotenv").config();
const mongoose = require('mongoose');
const Task = require('../models/task.model');

// Replace with your MongoDB connection string
const mongoURI = process.env.DB_URL;



// Sample data to migrate
const data = [
    {
      id: "1",
      title: "Making A New Trend In Poster",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 50,
      status: "PENDING",
      order: 1,
    },
    {
      id: "2",
      title: "Creating Remarkable",
      date: "16 Nov 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 20,
      status: "PENDING",
      order: 2,
    },
    {
      id: "3",
      title: "Advertisers Embrace Rich Media",
      date: "22 Oct 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 20,
      status: "PENDING",
      order: 3,
    },
    {
      id: "4",
      title: "Meet the People Who Train",
      date: "15 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 40,
      status: "PENDING",
      order: 4,
    },
    {
      id: "5",
      title: "Advertising Outdoors",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 80,
      status: "PROGRESS",
      order: 1,
    },
    {
      id: "6",
      title: "Manufacturing Equipment",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 55,
      status: "PROGRESS",
      order: 2,
    },
    {
      id: "7",
      title: "Advertising Outdoors",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 60,
      status: "PROGRESS",
      order: 3,
    },
    {
      id: "8",
      title: "Truck Side Advertising Time",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 85,
      status: "PROGRESS",
      order: 4,
    },
    {
      id: "9",
      title: "Importance Of The Custom",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 25,
      status: "PROGRESS",
      order: 5,
    },
    {
      id: "10",
      title: "Creative Outdoor Ads",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 100,
      status: "COMPLETED",
      order: 1,
    },
    {
      id: "11",
      title: "Promotional Advertising Specialty",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 100,
      status: "COMPLETED",
      order: 2,
    },
    {
      id: "12",
      title: "Search Engine Optimization",
      date: "17 Dec 2022",
      stats: "30/48",
      assignedTo: "MK",
      progress: 100,
      status: "COMPLETED",
      order: 3,
    },
  ];

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Insert the sample data into the database
    try {
      await Task.insertMany(data);
      console.log("Data migration completed successfully.");
    } catch (error) {
      console.error("Data migration failed:", error);
    } finally {
      // Close the database connection
      mongoose.connection.close();
    }
  })
  .catch(err => console.error("Could not connect to MongoDB:", err));
