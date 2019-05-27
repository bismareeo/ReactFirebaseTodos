import React from 'react';
import './App.css';
import Todos from './Containers/Todos/Todos';

const App = () => {
  return <Todos />;
};

export default App;































// getTodos = () => {
  //   let ref = Firebase.database().ref('/');
  //   ref.on('value', snapshot => {
  //     const state = snapshot.val();
  //     this.setState(state);
  //   });
  //   console.log('DATA RETRIEVED');
  // }

  // componentDidMount() {
  //   this.getUserData();
  // }



  // removeData = (developer) => {
  //   const { developers } = this.state;
  //   const newState = developers.filter(data => {
  //     return data.uid !== developer.uid;
  //   });
  //   this.setState({ developers: newState });
  // }

  // updateData = (developer) => {
  //   this.refs.uid.value = developer.uid;
  //   this.refs.name.value = developer.name;
  //   this.refs.role.value = developer.role;
  // }
