import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function PlayerPreview(props) {
  return(
    <div>
      <div className="column">
        <img src={props.avatar} alt={"Avatar for "+props.username} className="avatar"/>
        <h2 className="username">@{props.username}</h2>
      </div>
      <button 
        className="reset"
        onClick = {props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired 
}

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
              id = 'playerOne'
              onReset = {this.handleReset}
              avatar = {this.state.playerOneImage}
              username = {this.state.playerOneName}
            />}
          {!this.state.playerTwoName ? 
            <PlayerInput
              id = 'playerTwo'
              label = 'Player Two'
              onSubmit = {this.handleSubmit}
            /> : 
            <PlayerPreview 
              id = 'playerTwo'
              onReset = {this.handleReset}
              avatar = {this.state.playerTwoImage}
              username = {this.state.playerTwoName}
            />}
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