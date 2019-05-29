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

  onSaveComment = () => {
    const comment = this.refs.comment.value;
    const {todo} = this.props;
    this.props.onSaveComment(todo, comment);
  }

  componentDidMount() {
    console.log('hola')
    const {commentKey} = this.props.todo;
    if(commentKey) {
      Firebase.database().ref('/comments/'+commentKey).on('value', result => {
        const { content } = result.val();
        this.setState({
          comments: content
        });
      });
    }
  }

  render() {
    const {comments} = this.state;
    const showComments = comments.map((comment, index) => {
      return (
        <div key={index+comment.email} className='show-content-comments'>
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