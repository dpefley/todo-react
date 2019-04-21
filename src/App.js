import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

// Component that does initial setup and composes your other components

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
    // stuff here
    this.display = this.display.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.postAJAX = this.postAJAX.bind(this);
    this.createAJAX = this.createAJAX.bind(this);
    this.retrieveAJAX = this.retrieveAJAX.bind(this);
    this.displayToDos = this.displayToDos.bind(this);
    this.deleteAJAX = this.deleteAJAX.bind(this);
    this.findIdAndDelete = this.findIdAndDelete.bind(this);
    this.findIdAndUpdate = this.findIdAndUpdate.bind(this);
  }

  display(entry, idPassed) { //Creates new HTML elements for each ToDo
    //var entry = document.getElementById("textEntry").value;
    if (entry == "") {
      entry = "New ToDo";
    }

    var numChildren = document.getElementById("newTodos").childElementCount;

    var div = document.createElement('div');
    div.id = idPassed;

    document.getElementById("newTodos").appendChild(div);
    document.getElementById(idPassed).innerHTML = '<br><div id="todo"><input type="checkbox" name="complete" value="Done" id="complete" onclick="findIdAndUpdate(this)"><button type="button" name="delete" id="delete" onclick="findIdAndDelete(this)">Delete</button><div id="todoText">'+entry+'</div></div>';
  }

  checkBox(completed, idPassed) {
    var children = document.getElementById(idPassed).children;
    if (children == null) {
      console.log("no children");
      return;
    }

    var grandChild = null;
    for (var i = 0; i < children.length; i++) {
      if (children[i].id == "todo") {
        grandChild = children[i].children;
        children[i].style.height = "18px"
        if (completed) {
          children[i].style.backgroundColor = "green"
        }
        else {
          children[i].style.backgroundColor = "#EFEFEF"
        }
      }
    }

    if (grandChild != null) {
      for (var i = 0; i < grandChild.length; i++) {
        if (grandChild[i].id == "complete") {
          grandChild[i].checked = completed;
        }
      }
    }
  }

  postAJAX() {
    var entry = document.getElementById("textEntry").value;
    //console.log(entry);
    if (entry == "") {
      entry = "New ToDo";
    }

    createAJAX(entry);
    retrieveAJAX();
    document.getElementById("textEntry").value = "";
  }

  createAJAX(textInput) {
    var data = {
      text: textInput
    }

    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        //console.log(todo);
        retrieveAJAX();
      }
      else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };

    xhttp2.open("POST", "https://api.kraigh.net/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send(JSON.stringify(data));
  }

  retrieveAJAX() {
    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        //console.log(todo);
        displayToDos(todo);
      }
    };

    xhttp2.open("GET", "https://api.kraigh.net/todos", true);

    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send();
  }

  displayToDos(todos) {
    if (todos.length == 0) {
      //console.log("No todos, or unable to retrieve.")
      return;
    }

    for (var i = 0; i < todos.length; i++) {
      // console.log(todos[i].text);
      display(todos[i].text, todos[i].id);
      checkBox(todos[i].completed, todos[i].id);
    }
  }

  deleteAJAX(grandParent) {
    document.getElementById(grandParent.id).innerHTML = '';

    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        //console.log(todo);
        retrieveAJAX();
      }
      else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };

    xhttp2.open("DELETE", "https://api.kraigh.net/todos/"+grandParent.id);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send();
  }

  findIdAndDelete(node) {
    var grandParent = node.parentElement.parentElement;
    deleteAJAX(grandParent);
  }

  findIdAndUpdate(node) {
    var grandParent = node.parentElement.parentElement;
    updateAJAX(grandParent, node);
  }

  updateAJAX(grandParent, node) {
    var xhttp2 = new XMLHttpRequest();

    var checked = false;
    if (node.checked){
      checked = true;
    }

    var data = {
      completed: checked
    };

    xhttp2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        retrieveAJAX();
      }
      else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };

    xhttp2.open("PUT", "https://api.kraigh.net/todos/"+grandParent.id);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
    xhttp2.send(JSON.stringify(data));
  }

  render() {
    return (
      <div id="newTodos">
        <NewTodo />
        <Todo />
      </div>
    );
  }
}

export default App;
