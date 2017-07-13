import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview.js'


class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleChange(e) {
    var value = e.target.value;
    this.setState(function() {
      return {username: value}
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="column">
        <label htmlFor="username" className="header">{this.props.label}</label>
        <input 
         type="text" 
         id="username"
         placeholder="github username"
         autoComplete = "off"
         value={this.state.username}
         onChange={this.handleChange}/>
         <button 
          className="button"
          type="submit"
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {
      let newState = {};
      newState[id +'Name'] = username;
      newState[id +'Image'] = 'https://github.com/'+ username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      let newState = {};
      newState[id+'Name'] = '';
      newState[id+'Image'] = null;
      return newState;
    });
  }

  render() {
    return(
      <div>
        <div className="row">
          {!this.state.playerOneName ? 
            <PlayerInput
              id = 'playerOne'
              label = 'Player One'
              onSubmit = {this.handleSubmit}
            /> : 
            <PlayerPreview 
              avatar = {this.state.playerOneImage}
              username = {this.state.playerOneName}
            > 
              <button 
                className="reset"
                onClick = {this.handleReset.bind(null, 'playerOne')}>
                Reset
              </button>
            </PlayerPreview>}
          {!this.state.playerTwoName ? 
            <PlayerInput
              id = 'playerTwo'
              label = 'Player Two'
              onSubmit = {this.handleSubmit}
            /> : 
            <PlayerPreview 
              avatar = {this.state.playerTwoImage}
              username = {this.state.playerTwoName}
            >
              <button 
                className="reset"
                onClick = {this.handleReset.bind(null, 'playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}
        </div>
        {this.state.playerOneName && this.state.playerTwoName &&
          <Link 
            to = {
              {
                pathname: this.props.match.url +'/results',
                search: `?playerOneName=${this.state.playerOneName}&playerTwoName=${this.state.playerTwoName}`,
              }
            }
            className="button">
            Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle;