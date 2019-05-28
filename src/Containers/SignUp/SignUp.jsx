import React from 'react';
import Firebase from 'firebase';

export default class SingUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: '',
      colorAlertMessage: '',
      verificationMessage: '',
      isRegistered: false,
    }
  }
  
  handleSingUp = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;
    if (password === confirmPassword) {
      Firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
        const user = result.user;
        user.sendEmailVerification().then(result => {
          this.setState({
            verificationMessage: 'Please verify sing up in your email',
            colorAlertMessage: 'green',
          });
        }).catch(err => {
          console.log('error')
        })
        this.setState({
          alertMessage: 'Successful registered',
          colorAlertMessage: 'green',
          isRegistered: true,
        })
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

      });
    } else {
      this.setState({
        alertMessage: 'Wrong passwords',
        colorAlertMessage: 'red',
        isRegistered: true,
      });
    }
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
          <p>Confirm your password</p>
          <input type="password" ref='confirmPassword' />
          {
            this.state.isRegistered ? <h3 style={{color: this.state.colorAlertMessage}}>{this.state.alertMessage}, {this.state.verificationMessage} </h3> : null
          }
          <div>
            <button type='submit'>Sing In</button>
          </div>
        </form>
      </div>
    )
  }
}