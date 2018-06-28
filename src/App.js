import React, { Component } from 'react';

import APIInspector from './components/APIInspector';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <APIInspector />
      </div>
    );
  }
}

export default App;
