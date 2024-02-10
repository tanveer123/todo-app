import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
//import Todo from './Todo';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"https://todo-app-back-murex.vercel.app/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {
	constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
	//axios.defaults.withCredentials = true;
        /*fetch('https://todo-app-back-murex.vercel.app/')
            .then(response => {
                this.setState({ todos: response.data });
                //console.log(response.data);
            })
            .catch(function (error){
                console.log(error);
            })*/
	    useEffect(() => {
        fetch("https://todo-app-back-murex.vercel.app")
            .then((res) => res.json());
    }, []);
    }

    todoList() {
        /*return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })*/
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    	{ this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
