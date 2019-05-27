import React from 'react';
import Firebase from 'firebase';
import { config } from '../../config';

import SaveTodo from '../../Components/SaveTodo/SaveTodo';
import ShowTodo from '../../Components/ShowTodo/ShowTodo';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);
    this.state = {
      todos: []
    };
  }

  onSaveTodo = (title, description) => {
    Firebase.database().ref('todos').push({
      title,
      description,
    });

  }

  objectToArray = obj => {
    const arr = [];
    for(let key in obj) {
      const newObj = {
        key,
        title: obj[key].title,
        description: obj[key].description,
      };
      arr.push(newObj);
    }
    return arr;
  }

  componentDidMount() {
    Firebase.database().ref('/').on('value', data => {
      const todos = data.val().todos;
      const arrTodos = this.objectToArray(todos);
      this.setState({
        todos: arrTodos,
      });
    })
  }

  render() {
    return (
      <div>
        <SaveTodo onSaveTodo={this.onSaveTodo}/>
        <ShowTodo todos={this.state.todos}/>
      </div>
    );
  }
}