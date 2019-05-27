import React from 'react';
import './App.css';
import Firebase from 'firebase';

import Todos from './Containers/Todos/Todos';
import SignIn from './Containers/SignIn/SignIn';
import SignUp from './Containers/SignUp/SignUp';

class App extends React.Component {
  singInWithEmail = (email, password) => {
    Firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      console.log('successfully logged', result)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorCode, errorMessage)
    });
  }

  singUpWithEmail = (email, password) => {
    Firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
      console.log('successfully registered', result)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorCode, errorMessage)
    });
  }

  render() {
    return (
      <div>
        <SignIn onSingInWithEmail={this.singInWithEmail}/>
        <SignUp onSingUpWithEmail={this.singUpWithEmail}/>
        <Todos />
      </div>
    )
  }
};

export default App;
