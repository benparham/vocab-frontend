'use strict'

var React = require('react');
var Navigation = require('react-router').Navigation;
var SessionActions = require('../../actions/Session.actions.js');

var KEY_CODE_ENTER = 13;

var Login = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      usernameVal: '',
      passwordVal: '',
      message: ''
    };
  },

  handleUsernameChange: function(event) {
    this.setState({
      usernameVal: event.target.value
    });
  },

  handlePasswordChange: function(event) {
    this.setState({
      passwordVal: event.target.value
    });
  },

  handleLoginClick: function() {
    Vocab.login(this.state.usernameVal, this.state.passwordVal).then(
      function(result) {
        console.log('Login success!');
        console.log(result);
        SessionActions.loadSession(result.response);
        this.transitionTo('app');
      }.bind(this),
      function(err) {
        console.log(err.status);
        var newMessage = (err.status == 0) ? err.message : 'Invalid username/password';
        if (this.isMounted()) {
          this.setState({message: newMessage});
        }
      }.bind(this)
    );
  },

  handleKeyDown: function(event) {
    if (event.keyCode == KEY_CODE_ENTER) {
      this.handleLoginClick();
    }
  },

  render: function() {
    return (
      <div id='login'>
        <input
            id='username'
            type='text'
            placeholder='Username'
            value={this.state.usernameVal}
            onChange={this.handleUsernameChange}
            onKeyDown={this.handleKeyDown}/>
          <input
            id='password'
            type='password'
            placeholder='Password'
            value={this.state.passwordVal}
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyDown}/>
          <button id='submit' onClick={this.handleLoginClick}>Login</button>
          <p>{this.state.message}</p>
      </div>
    );
  }
});

module.exports = Login;
