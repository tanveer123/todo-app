const express = require('express');
const app = express();
//const todoRoutes = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
let Todo = require('./Todo');
//require("dotenv").config();

/*const corsOptions = {
    //origin: "http://localhost:3000" // frontend URI (ReactJS)
    origin: "https://todo-app-front-fawn.vercel.app",
    methods: ["POST","GET"],
    credentials: true
}

app.use(cors(corsOptions));*/

/*app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://todo-app-front-fawn.vercel.app"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});*/

//app.use(cors());
app.use(express.json());

//mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin:<admin@123>@cluster0.shwdnpa.mongodb.net/?retryWrites=true&w=majority');
/*const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})*/
/*mongoose.connect('mongodb+srv://admin:<admin@123>@cluster0.shwdnpa.mongodb.net/?retryWrites=true&w=majority').then(() => {
    const PORT = 4000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});*/
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
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
