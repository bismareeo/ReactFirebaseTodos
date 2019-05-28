import React from 'react';
import Firebase from 'firebase';

export default class SingIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: '',
      colorAlertMessage: '',
      isLogged: false,
    }
  }

  handleSingIn = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    Firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      if(result.user.emailVerified) {
        this.setState({
          alertMessage: 'Successful Logged',
          colorAlertMessage: 'green',
          isLogged: true,
        });
      } else {
        this.setState({
          alertMessage: 'Verify your email please',
          colorAlertMessage: 'red',
          isLogged: true,
        });
        Firebase.auth().signOut();
      }

    }).catch(error => {
      var errorMessage = error.message;
      this.setState({
        alertMessage: errorMessage,
        colorAlertMessage: 'red',
        isLogged: true,
      })
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
          {
            this.state.isLogged 
              ? <h3 style={{ color: this.state.colorAlertMessage }}>{this.state.alertMessage} </h3> 
              : null
          }
          <div>
            <button type='submit'>Sing In</button>
          </div>
        </form>
      </div>
    )
  }
}