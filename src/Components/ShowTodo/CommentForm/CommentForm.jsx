import React from 'react';

import Firebase from 'firebase';
import './CommentForm.css';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      comments: [],
    }
  }

  onClearInput = () => {
    this.refs.comment.value = '';
  }

  onSaveComment = () => {
    const comment = this.refs.comment.value;
    const {todo} = this.props;
    this.props.onSaveComment(todo, comment);
    this.onClearInput();
  }

  objectToArray = obj => {
    const arr = [];
    for (let key in obj) {
      const newObj = {
        key,
        comment: obj[key].comment,
        email: obj[key].email,
      };
      arr.push(newObj);
    }
    return arr;
  }

  componentDidMount() {
    const {key} = this.props.todo;
      Firebase.database().ref('/comments/'+key).on('value', result => {
        const arrComments = this.objectToArray(result.val());
        this.setState({
          comments: arrComments
        });
      });
  }

  render() {
    const {comments} = this.state;
    const showComments = comments.map(comment => {
      return (
        <div key={comment.key} className='show-content-comments'>
          <p className='content'><strong>{comment.email}: </strong> {comment.comment}</p>
        </div>
      )
    });
    return (
      <div>
        <h5 className="title-comment">Comments</h5>
        <div className='container-commentForm'>
          {showComments}
        </div>
        <input type="text" ref='comment' />
        <button onClick={this.onSaveComment}> > </button>
      </div>
    )
  }
}