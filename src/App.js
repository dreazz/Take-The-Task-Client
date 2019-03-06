import React, { Component } from 'react';
import logo from './logo.svg';

import TaskContainer from './components/TaskContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div> 
        <TaskContainer></TaskContainer>
      </div>
    );
  }
}

export default App;
