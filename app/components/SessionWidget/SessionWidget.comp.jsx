'use strict'

var React = require('react');

var SessionActions = require('../../actions/Session.actions.js');

var SessionWidget = React.createClass({
  propTypes: {
    session: React.PropTypes.object.isRequired
  },

  handleLogoutClick: function() {
    Vocab.logout();
    SessionActions.dropSession();
  },

  render: function() {
    var session = this.props.session;
    return (
      <div id='sessionWidget'>
        <p id='username'>{session.username}</p>
        <button id='logout' onClick={this.handleLogoutClick}>Logout</button>
      </div>
    );
  }
});

module.exports = SessionWidget;
