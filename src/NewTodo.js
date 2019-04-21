import React, { Component } from 'react';
import './NewTodo.css';

// Component containing the form for a new Todo

class NewTodo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <form id="entryForm" onSubmit={this.props.addTodo}>
          New ToDo: <input type="text" id="textEntry" value={this.props.input} onChange={this.props.onChange}></input>
          <button type="submit" id="textSubmit" >Add</button>
        </form>
    );
  }
}

export default NewTodo;
