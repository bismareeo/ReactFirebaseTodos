import React from 'react';
import './App.css';
import Firebase from 'firebase';

import Todos from './Containers/Todos/Todos';
import SignIn from './Containers/SignIn/SignIn';

class App extends React.Component {
  singInWithEmail = (email, password) => {
    Firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      console.log('successfully', result)

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage)
    });
  }

  
  
  render() {
    return (
      <div>
        <SignIn onSingInWithEmail={this.singInWithEmail}/>
        <Todos />
      </div>
    )
  }
};

export default App;
