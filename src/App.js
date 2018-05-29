import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FourByFour from './Components/FourByFour'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Grid Test</h1>
        <FourByFour/>
      </div>
    );
  }
}

export default App;
