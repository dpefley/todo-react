import React, { Component } from 'react';
import './Todo.css';

// Component containing HTML for a single Todo

class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      id: '',
      complete: false
    }

    this.findIdAndUpdate = this.findIdAndUpdate.bind(this);
  }

  findIdAndUpdate() {
    var xhttp2 = new XMLHttpRequest();

    var completed = this.props.complete;
    var completeTo = !completed;
    var data = {
      complete: false
    };

    xhttp2.onreadystatechange = function() {
      if (xhttp2.readyState == 4 && xhttp2.status == 200) {
        retrieveAJAX();
      }
      else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };

    xhttp2.open("PUT", "https://api.kraigh.net/todos/"+this.props.id);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send(JSON.stringify(data));
  }

  render() {
    return (
    		<div id={this.props.id} className="todo">
    			<input type="checkbox" name="complete" value="Done" id="complete" onClick={this.findIdAndUpdate}></input>
    			<button type="button" name="delete" id="delete" onClick={this.props.findIdAndDelete}>Delete</button>
    			<div>{this.props.text}</div>
    		</div>
    );
  }
}

export default Todo;
