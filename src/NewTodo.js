import React, { Component } from 'react';
import './NewTodo.css';

// Component containing the form for a new Todo

class NewTodo extends Component {
  constructor() {
    super(props);
  }

  render() {
    return (
        <form id="entryForm">
          New ToDo: <input type="text" id="textEntry"></input>
          <button type="button" id="textSubmit" onclick={this.props.postAJAX}>Add</button>
        </form>
    );
  }
}

export default NewTodo;
