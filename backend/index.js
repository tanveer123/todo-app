const express = require('express');
const app = express();
const todoRoutes = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
import { MongoClient } from "mongodb";
const PORT = 4000;
let Todo = require('./Todo');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

/*const corsOptions = {
    //origin: "http://localhost:3000" // frontend URI (ReactJS)
    origin: "https://todo-app-front-fawn.vercel.app",
    methods: ["POST","GET"],
    credentials: true
}

app.use(cors(corsOptions));*/

const corsConf = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsConf));

app.use(express.json());

//mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
/*mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log(process.env.MONGODB_URI);
}).catch(err => {
    console.log(err);
});*/
//const connection = mongoose.connection;
/*connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})*/

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.get("/",  (req, res) => {
	//const todos = Todo.find();
    /*res.json(todos);*/
    //res.status(201).json({ data: process.env.MONGODB_URI });
    //res.status(201).json({ message: process.env.MONGODB_URI });
	try {
	    // Connect the client to the server	(optional starting in v4.7)
	    await client.connect();
	    // Send a ping to confirm a successful connection
	    await client.db("tasks").command({ ping: 1 });
	    console.log("Pinged your deployment. You successfully connected to MongoDB!");
	  } finally {
	    // Ensures that the client will close when you finish/error
	    await client.close();
	  }
});

/*todoRoutes.route('/:id').get(async function(req, res) {
    let id = req.params.id;
    try {
    	const todo = await Todo.findById(id);
    	res.json(todo);
    } catch (err) {
	    console.log(err);
	  }
});

todoRoutes.route('/add').post(function(req, res) {
    //let todo = new Todo(req.body);
    const todo = new Todo({
                todo_description: req.body.todo_description,
                todo_responsible: req.body.todo_responsible,
                todo_priority: req.body.todo_priority,
                todo_completed: req.body.todo_completed,
            });
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(async function(req, res) {
	try {
    	const todo = await Todo.findById(req.params.id);
    	
    	if (!todo)
            res.status(404).send("data is not found");
        else
        {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    } catch (err) {
	    console.log(err);
  	}
    
});

app.use('/todos', todoRoutes);*/
