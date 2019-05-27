import React from 'react';
import './App.css';
import Firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {config} from './config';

import Todos from './Containers/Todos/Todos';
import SignIn from './Containers/SignIn/SignIn';
import SignUp from './Containers/SignUp/SignUp';

const Home = () => <h2>this is my home</h2>
Firebase.initializeApp(config);
const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/todos" component={Todos} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </div>
  </Router>
);

const Header = () => (
  <>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/todos">Todos</Link>
    </li>
    <li>
      <Link to="/signin">SignIn</Link>
    </li>
    <li>
      <Link to="/signup">SignUp</Link>
    </li>
  </ul>
  </>
);

export default App;
