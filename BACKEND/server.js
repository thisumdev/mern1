require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const cors = require("cors");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 8070; // Default to 8070 if not provided

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection String
const DB_URL = process.env.MONGODB_URL;

// Connect to MongoDB Atlas
mongoose
  .connect(DB_URL)
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit the application on error
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection succesfull");
});

const studentRouter = require("./routes/students.js");

app.use("/student", studentRouter);

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export app for testing (optional)
module.exports = app;
