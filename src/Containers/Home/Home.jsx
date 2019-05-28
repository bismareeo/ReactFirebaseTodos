import React from 'react';
import Firebase from 'firebase';

export default class Home extends React.Component {
  render() {
    const user = Firebase.auth().currentUser;
    return (
      user
        ? <p>welcome {user.email}</p>
        : <p>Please sign up in our application</p>
    );
  }
}