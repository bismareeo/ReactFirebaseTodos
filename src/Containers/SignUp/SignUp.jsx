import React from 'react';
import Firebase from 'firebase';

export default class SingUp extends React.Component {
  handleSingUp = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    Firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
      console.log('successfully logged')
      result.sendEmailVerification();
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorCode, errorMessage)
    });

    const user = Firebase.auth().currentUser;
    user.sendEmailVerification().then(result => {
      console.log('enviado');
    }).catch(err => {
      console.log('error')
    })
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSingUp}>
          <h3>Sign Up</h3>
          <p>Email</p>
          <input type="text" ref='email' />
          <p>Password</p>
          <input type="password" ref='password' />
          <p>Re write your password</p>
          <input type="password" ref='password' />
          <div>
            <button type='submit'>Sing In</button>
          </div>
        </form>
      </div>
    )
  }
}