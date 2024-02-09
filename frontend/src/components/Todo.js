import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Todo extends Component {
	constructor(props) {
        super(props);
    }

    render() {
    	return(
    		<tr>
		        <td>{this.props.todo.todo_description}</td>
		        <td>{this.props.todo.todo_responsible}</td>
		        <td>{this.props.todo.todo_priority}</td>
		        <td>
		            <Link to={"/edit/"+this.props.todo._id}>Edit</Link>
		        </td>
		    </tr>
    	)
    }
}