import React, { Component } from 'react';
import '../App.css';
import Popular from './Popular.js';
import Nav from './Nav.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Route path='/popular' component={Popular} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
