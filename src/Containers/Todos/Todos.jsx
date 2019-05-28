import React from 'react';
import Firebase from 'firebase';

import SaveTodo from '../../Components/SaveTodo/SaveTodo';
import ShowTodo from '../../Components/ShowTodo/ShowTodo';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isShowSaveTodo: false,
      todo: {},
    };
  }

  onSaveTodo = (title, description) => {
    Firebase.database().ref('todos').push({
      title,
      description,
      status: 'to-do',
      commentKey: false,
    });
    this.setState({
      isShowSaveTodo: false,
    });
  }

  objectToArray = obj => {
    const arr = [];
    for(let key in obj) {
      const newObj = {
        key,
        title: obj[key].title,
        description: obj[key].description,
        status: obj[key].status,
        commentKey: obj[key].commentKey,
      };
      arr.push(newObj);
    }
    return arr;
  }

  componentDidMount() {
    Firebase.database().ref('/').on('value', data => {
      if (data.val()) {
        const todos = data.val().todos;
        const arrTodos = this.objectToArray(todos);
        this.setState({
          todos: arrTodos,
        });
      }
    })
  }

  deleteTodo = key => {
    Firebase.database().ref('todos/'+key).remove();
  }

  changeStateTodo = (key, status) => {
    Firebase.database().ref('todos/'+key).update({
      status 
    })
  }

  changeTodo = (todo) => {
    this.setState({
      todo,
      isShowSaveTodo: true
    });
  }

  updateTodo = (key, title, description, status) => {
    Firebase.database().ref('todos/'+key ).update({
      key,
      title,
      description,
      status,
    });
    this.setState({
      isShowSaveTodo: false,
      todo: {}
    });
  }

  addNewTodo = () => {
    this.setState({
      isShowSaveTodo: true,
    });
  }

  saveComment = (todo, comment) => {
    const user = Firebase.auth().currentUser;
    const { email } = user;
    const { key, title, description, status, commentKey } = todo;
    if (commentKey) {
      Firebase.database().ref('/comments/'+commentKey).once('value').then(result => {
        const { content } = result.val();
        const newComment = {
          comment,
          email,
        };
        content.push(newComment);
        Firebase.database().ref('comments/'+commentKey).set({
          content
        })
      });

    } else {
      const commentRegistered = Firebase.database().ref('comments').push({
        content: [
          { comment, email, }
        ],
      });
      const commentKey = commentRegistered.key;
      Firebase.database().ref('todos/'+key ).set({
        title,
        description,
        status,
        commentKey,
      });
    }
  }

  render() {
    const { todo, todos } = this.state;
    return (
      <div>
        {this.state.isShowSaveTodo 
          ? <SaveTodo onSaveTodo={this.onSaveTodo} todo={todo} onUpdateTodo={this.updateTodo}/>
          : null}
        <ShowTodo 
          todos={todos} 
          onDeleteTodo={this.deleteTodo} 
          onChangeStateTodo={this.changeStateTodo}
          onUpdateTodo={this.changeTodo}
          onAddNewTodo={this.addNewTodo}
          onSaveComment={this.saveComment}/>
      </div>
    )
  }
}