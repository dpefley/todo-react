import React, { Component } from 'react';
import './Todo.css';

// Component containing HTML for a single Todo

class Todo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // <div>
      //   <input type="checkbox" onclick={this.props.findIdAndUpdate(this)}></input>
      //   <button onClick={this.props.findIdAndDelete}>Delete</button>
      //   <p>{this.props.todoText}</p>
      // </div>


    		<div id="todo" className="todo">
    			<input type="checkbox" name="complete" value="Done" id="complete" onclick={this.props.findIdAndUpdate}></input>
    			<button type="button" name="delete" id="delete" onclick={this.props.findIdAndDelete}>Delete</button>
    			<div id={this.props.todoText}>New Todo</div>
    		</div>
    );
  }
}

export default Todo;
