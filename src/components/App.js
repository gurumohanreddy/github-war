import React, { Component } from 'react';
import '../App.css';
import Popular from './Popular.js';
import Nav from './Nav.js';
import Home from './Home.js';
import Battle from './Battle.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/github-war">
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render = {function() {
              return (<p>Looks like you got off at the wrong station</p>);
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
