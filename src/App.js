import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import "./style/eduardo.scss"

import "./App.css";

import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main/>     
      </div>
    );
  }
}

export default App;


