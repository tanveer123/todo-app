const express = require('express');
const app = express();
const todoRoutes = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
let Todo = require('./Todo');

const corsOptions = {
    //origin: "http://localhost:3000" // frontend URI (ReactJS)
    origin: "https://todo-app-back-murex.vercel.app",
    methods: ["POST","GET"],
    credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

//mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
/*mongoose.connect('mongodb+srv://admin:<admin@123>@cluster0.shwdnpa.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})*/

todoRoutes.route('/').get(async (req, res) => {
    try {
    	/*const todos = await Todo.find();
    	res.json(todos);*/
        res.status(201).json({ message: "Connected to Backend!" });
    } catch (err) {
	    console.log(err);
	  }

    /*Todo.find().then((err, todos) => {
	    console.log("result")
	    if (err) {
	      res.send(err)
	    }
	    res.send(todos)
	  })*/
});

todoRoutes.route('/:id').get(async function(req, res) {
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

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});