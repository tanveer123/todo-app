const express = require('express');
const app = express();
const todoRoutes = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
let Todo = require('./Todo');
require("dotenv").config();

const corsOptions = {
    origin: "https://todo-app-front-fawn.vercel.app",
    methods: ["POST", "GET"],
    credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Set up CORS preflight OPTIONS request handling
app.options('*', cors(corsOptions));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.get('/', async (req, res) => {
    try {
        res.status(201).json({ message: "Connected to Backend!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
