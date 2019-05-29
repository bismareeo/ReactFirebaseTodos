import React from 'react';
import { Link } from "react-router-dom";
import Firebase from 'firebase';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged: false,
    }
  }
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isUserLogged: true,
        })
      } else {
        this.setState({
          isUserLogged: false,
        })
      }
    });
  }
  render() {
    const { isUserLogged } = this.state;
    return (
      <>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {
            isUserLogged
              ? <li>
                <Link to="/todos">Todos</Link>
              </li>
              : null
          }
          {
            !isUserLogged &&
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              < li >
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          }
        </ul>
      </>
    )
  }
}