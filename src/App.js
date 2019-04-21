import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

// Component that does initial setup and composes your other components

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);

    // stuff here
    // this.display = this.display.bind(this);
    // this.checkBox = this.checkBox.bind(this);
    // this.postAJAX = this.postAJAX.bind(this);
    // this.createAJAX = this.createAJAX.bind(this);
    // this.retrieveAJAX = this.retrieveAJAX.bind(this);
    // this.displayToDos = this.displayToDos.bind(this);
    // this.deleteAJAX = this.deleteAJAX.bind(this);
    // this.findIdAndDelete = this.findIdAndDelete.bind(this);
    // this.findIdAndUpdate = this.findIdAndUpdate.bind(this);
  }

  componentDidMount() {
    var self = this;
    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
      if (xhttp2.readyState == 4 && xhttp2.status == 200) {
        var todo = JSON.parse(xhttp2.responseText);
        //console.log(todo);
        //displayToDos(todo);
        self.setState({todos: todo});

      }
    };

    xhttp2.open("GET", "https://api.kraigh.net/todos", true);

    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send();
  }

  render() {
    return (
      <div id="newTodos">
        <NewTodo />
        {this.state.todos.map((todo) =>
          <Todo key={todo.id} text={todo.text}/>
        )}
        //<Todo />
      </div>
    );
  }
}

export default App;
