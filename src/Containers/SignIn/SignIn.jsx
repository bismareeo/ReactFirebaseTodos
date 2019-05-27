import React from 'react';

export default class SingIn extends React.Component {
  handleSingIn = event => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.onSingInWithEmail(email, password);
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