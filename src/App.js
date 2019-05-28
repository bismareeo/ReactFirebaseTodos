import React from 'react';
import './App.css';
import Firebase from 'firebase';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {config} from './config';

import Todos from './Containers/Todos/Todos';
import SignIn from './Containers/SignIn/SignIn';
import SignUp from './Containers/SignUp/SignUp';
import Header from './Components/Header/Header';
import Home from './Containers/Home/Home';

Firebase.initializeApp(config);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isUserLogged: Firebase.auth().currentUser,
    };
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user=>{
      if(user) {
        this.setState({
          isUserLogged: true,
        })
      } else {
        this.setState({
          isUserLogged:false,
        })
      }
    }) ;
  }

  handleLogout = () => {
    Firebase.auth().signOut().then(result => {
      console.log('logout ')
    })
  }

  render () {
    return (
      <Router>
        <div>
          <Header />
          {this.state.isUserLogged ? <button onClick={this.handleLogout}>Logout</button>: null }
          <Route exact path="/" component={Home} />
          <Route path="/todos" component={Todos} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    )
  }
}

export default App;
