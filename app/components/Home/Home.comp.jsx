'use strict'

var React = require('react');

var EntryStore = require('../../stores/Entry.store.js');

var Home = React.createClass({
  _onEntryChange: function() { this.forceUpdate(); },

  componentDidMount: function() {
    EntryStore.addChangeListener(this._onEntryChange);
  },

  componentWillUnmount: function() {
    EntryStore.removeChangeListener(this._onEntryChange);
  },

  render: function() {
    console.log('Entries:');
    console.log(EntryStore.getEntryData());

    return (
      <div id='home'>
        Home Screen
      </div>
    );
  }
});

module.exports = Home;
