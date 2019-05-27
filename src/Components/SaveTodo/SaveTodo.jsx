import React from 'react';

import './SaveTodo.css';

export default class SaveTodo extends React.Component {
  onClearInputs = () => {
    this.refs.title.value = '';
    this.refs.description.value = '';
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const key = this.refs.key.value;
    const title = this.refs.title.value;
    const description = this.refs.description.value;
    const status = this.refs.status.value;
    if(key) {
      this.props.onUpdateTodo(key, title, description, status);
    } else {
      this.props.onSaveTodo(title, description);
    }
    this.onClearInputs();
  }

  render() {
    const {todo} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container-register-todo">
            <p><strong>Title </strong></p>
            <input type="text" value={todo.key ? todo.key : null} hidden={true} ref='key' />
            <input type="text" value={todo.status ? todo.status : null} hidden={true} ref='status' />
            <input
              className="input-title-todo" 
              type="text" 
              ref='title' 
              placeholder="Title..."
              defaultValue={todo.title ? todo.title : null}
              />
            <p><strong>Description </strong> </p>
            <textarea 
              cols="30" 
              rows="5" 
              ref='description' 
              placeholder="Description..."
              defaultValue={todo.description ? todo.description : null}
              >
            </textarea>
            <div>
              <button className="button-save-todo" type="submit" >Save</button>
            </div>
        </div>
      </form>
    );
  }
}