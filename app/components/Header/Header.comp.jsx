'use strict'

var React = require('react');

var SessionWidget = require('../SessionWidget/SessionWidget.comp.jsx');

var Header = React.createClass({
  propTypes: {
    session: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div id='header'>
        <button id='home' className='navButton'>Home</button>
        <button id='dashboard' className='navButton'>Dashboard</button>
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
