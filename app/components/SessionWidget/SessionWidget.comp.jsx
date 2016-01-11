'use strict'

var React = require('react');

var SessionWidget = React.createClass({
  propTypes: {
    session: React.PropTypes.object.isRequired
  },

  handleLogoutClick: function() {
    console.log('Will logout here');
  },

  render: function() {
    var session = this.props.session;
    return (
      <div id='sessionWidget'>
        <p id='username'>{session.username}</p>
        <button id='logout' onClick={this.handleLogoutClick}></button>
      </div>
    );
  }
});

module.exports = SessionWidget;
