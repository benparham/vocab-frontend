'use strict'

var React = require('react');

var Home = React.createClass({
  getInitialState: function() {
    return {entries: []};
  },

  componentDidMount: function() {
    Vocab.getAllEntries().then(
      function(result) {
        console.log('Retrieved entries:');
        console.log(result);
      },
      function(err) {
        console.log('Error retrieving entries:');
        console.log(err);
      }
    );
  },

  render: function() {
    console.log('Entries:');
    console.log(this.state.entries);

    return (
      <div id='home'>
        Home Screen
      </div>
    );
  }
});

module.exports = Home;
