import React from 'react';

import './SaveTodo.css';

export default class SaveTodo extends React.Component {
  onClearInputs = () => {
    this.refs.title.value = '';
    this.refs.description.value = '';
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.refs.title.value;
    const description = this.refs.description.value;
    this.props.onSaveTodo(title, description);
    this.onClearInputs();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container-register-todo">
            <p><strong>Title </strong></p>
            <input
              className="input-title-todo" 
              type="text" 
              ref='title' 
              placeholder="Title..."/>
            <p><strong>Description </strong> </p>
            <textarea name="" id="" cols="30" rows="5" ref='description' placeholder="Description..." ></textarea>
            <div>
              <button className="button-save-todo" type="submit" >Save</button>
            </div>
        </div>
      </form>
    );
  }
}