import React from 'react';

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
        <div>
          <div>
            <label>Title</label>
            <input type="text" ref='title' placeholder="Title..." />
          </div>
          <div>
            <label>Description</label>
            <input type="text" ref='description' placeholder="Description..." />
          </div>
        </div>
        <button type="submit" >Save</button>
      </form>
    );
  }
}