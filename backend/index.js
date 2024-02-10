const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 4000;
let Todo = require('./Todo');
require("dotenv").config();

// Allow CORS middleware
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// Apply CORS middleware to all routes
app.use(allowCors);

// Body parser middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// Define routes
app.get('/', async (req, res) => {
    try {
        res.status(201).json({ message: "Connected to Backend!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Start the server
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
