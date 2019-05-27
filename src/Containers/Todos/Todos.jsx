import React from 'react';
import Firebase from 'firebase';
import { config } from '../../config';

import SaveTodo from '../../Components/SaveTodo/SaveTodo';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);
    this.state = {
      todos: []
    };
  }

  writeTodos = () => {
    Firebase.database().ref('/').set(this.state);
    // console.log('DATA SAVED');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeTodos();
    }
  }
  

  onSaveTodo = (title, description) => {

    Firebase.database().ref('todos').push({
      title,
      description,
    });
      
  }

  render() {
    return (
      <SaveTodo onSaveTodo={this.onSaveTodo}/>
    );
  }
}