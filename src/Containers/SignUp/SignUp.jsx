import React from 'react';

export default class SingUp extends React.Component {
  handleSingUp = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.onSingUpWithEmail(email, password);
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