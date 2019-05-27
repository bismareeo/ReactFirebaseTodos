import React from 'react';
import Firebase from 'firebase';

export default class SingIn extends React.Component {
  handleSingIn = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    Firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      console.log('successfully logged', result)
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorCode, errorMessage)
    });
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSingIn}>
          <h3>Sign In</h3>
          <p>Email</p>
          <input type="text" ref='email' />
          <p>Password</p>
          <input type="password" ref='password' />
          <div>
            <button type='submit'>Sing In</button>
          </div>
        </form>
      </div>
    )
  }
}