import React from 'react';
import './ShowTodo.css';

export default class ShowTodo extends React.Component {
  render() {
    const todos = this.props.todos;
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
          <button 
            onClick={() => this.props.onDeleteTodo(todo.key)}
            className="button-delete-todo"
            >
            Delete
          </button>
        </div>
      )
    });
    return (
      <div className="container">
        <h3 className="title-container">My Todo' List</h3>
        {showTodos}
      </div>
    );
  }
}