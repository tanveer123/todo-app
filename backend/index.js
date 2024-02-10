const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
let Todo = require('./Todo');
require("dotenv").config();

// Configure CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

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
