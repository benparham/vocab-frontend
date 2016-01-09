'use strict'

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div id='application'>
        Hello World Application!
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
