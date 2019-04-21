import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

// Component that does initial setup and composes your other components

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      input: ''
    }

    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteAJAX = this.deleteAJAX.bind(this);
  }

  componentDidMount() {
    var self = this;
    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
      if (xhttp2.readyState === 4 && xhttp2.status === 200) {
        var todo = JSON.parse(xhttp2.responseText);
        self.setState({todos: todo});
        console.log(todo);
      }
    };

    xhttp2.open("GET", "https://api.kraigh.net/todos", true);

    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send();
  }

  onChange(event) {
    // Set the state to the value of the input
    this.setState({
      input: event.target.value
    });
  }

  addTodo(event) {
      event.preventDefault();
      var self = this;
      console.log("clicked");
      // const newTodoText = self.state.input;
      var data = {
        text: this.state.input
      }

      var xhttp2 = new XMLHttpRequest();

      xhttp2.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          // var todo = JSON.parse(this.responseText);
          //console.log(todo);
          // retrieveAJAX();
          self.setState({
            todos: [...self.state.todos, JSON.parse(this.responseText)]});
          self.setState({input: ''});
        }
        else if (this.readyState === 4) {
          console.log(this.responseText);
        }
      };

      xhttp2.open("POST", "https://api.kraigh.net/todos", true);

      xhttp2.setRequestHeader("Content-type", "application/json");
      xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
      xhttp2.send(JSON.stringify(data));
  }

  deleteAJAX(event) {
    console.log("gets in delete");
    var xhttp2 = new XMLHttpRequest();
    var id = event.target.parentNode.id;
    var self = this;
    xhttp2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // var todo = JSON.parse(this.responseText);
        //console.log(todo);
        const remainingTodos = self.state.todos.filter((todo) => {
          // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
          if (todo.id !== id) {
            return todo;
          }
        });
        console.log(remainingTodos);
        self.setState({
          todos: remainingTodos
        });
      }
      else if (self.readyState == 4) {
        console.log(this.responseText);
      }
    };

    xhttp2.open("DELETE", "https://api.kraigh.net/todos/"+id);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send();
  }

  render() {
    return (
      <div id="newTodos">
        <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input}/>
        {this.state.todos.map((todo) =>
          <Todo key={todo.id} id={todo.id} completed={todo.completed}
            text={todo.text} deleteAJAX={this.deleteAJAX}/>
        )}
      </div>
    );
  }
}

export default App;
