'use strict'

var React = require('react');
var Navigation = require('react-router').Navigation;

var SessionWidget = require('../SessionWidget/SessionWidget.comp.jsx');

var Header = React.createClass({
  propTypes: {
    session: React.PropTypes.object.isRequired
  },

  mixins: [Navigation],

  handleNavClick: function(dest) {
    this.transitionTo(dest);
  },

  render: function() {
    return (
      <div id='header'>
        <button
          id='home'
          className='navButton'
          onClick={this.handleNavClick.bind(this, 'home')}>
          Home
        </button>
        <button
          id='dashboard'
          className='navButton'
          onClick={this.handleNavClick.bind(this, 'dashboard')}>
          Dashboard
        </button>
        <input
          id='wordInput'
          type='text'
          placeholder='Add Word'/>
        <SessionWidget session={this.props.session}/>
      </div>
    );
  }
});

module.exports = Header;
