import React, { Component } from 'react';
import '../App.css';
import Popular from './Popular.js';
import Nav from './Nav.js';
import Home from './Home.js';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/github-war">
        <div className="container">
          <Nav />
          <Route exact path='/' component={Home} />
          <Route path='/popular' component={Popular} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
