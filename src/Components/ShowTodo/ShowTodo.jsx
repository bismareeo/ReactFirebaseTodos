import React from 'react';

import CommentForm from './CommentForm/CommentForm';
import './ShowTodo.css';

export default class ShowTodo extends React.Component {
  render() {
    const {todos} = this.props;
    const stateTodo = {
      todo: 'to-do',
      doing: 'doing',
      done: 'done',
    };
    const showTodos = todos.map(todo => {
      return (
        <div 
          key={todo.key} 
          className={"todo-content todo-content-"+todo.status}>
          <p> <strong> Title: </strong> {todo.title}</p>
          <p> <strong> Description: </strong> {todo.description}</p>
          <button 
            onClick={() => this.props.onChangeStateTodo(todo.key, stateTodo.todo)}
            className="button-change-state-to-do"
            >To-Do
          </button>
          <button 
            onClick={() => this.props.onChangeStateTodo(todo.key, stateTodo.doing)}
            className="button-change-state-doing"
            >Doing
          </button>
          <button
            onClick={() => this.props.onChangeStateTodo(todo.key, stateTodo.done)}
            className="button-change-state-done"
            >Done
          </button>
          <CommentForm todo={todo} onSaveComment={this.props.onSaveComment}/>
          <button
            onClick={() => this.props.onUpdateTodo(todo)}
            className="button-update-todos"
            >Update
          </button>
          <button 
            onClick={() => this.props.onDeleteTodo(todo.key)}
            className="button-delete-todo"
            >Delete
          </button>
        </div>
      )
    });
    return (
      <div className="container">
        <h3 className="title-container">My Todo' List  
          <button className="button-add-to-do" onClick={this.props.onAddNewTodo}> + </button>
        </h3>
        {showTodos}
      </div>
    );
  }
}
