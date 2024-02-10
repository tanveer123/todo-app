const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

// Importing Todo model
const Todo = require('./Todo');

// Configuring environment variables
require("dotenv").config();

// CORS configuration
const corsOptions = {
    origin: "https://todo-app-front-fawn.vercel.app",
    methods: ["POST", "GET"],
    credentials: true
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
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
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
