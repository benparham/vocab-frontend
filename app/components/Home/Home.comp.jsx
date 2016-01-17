'use strict'

var React = require('react');

var EntryStore = require('../../stores/Entry.store.js');
var ActionTypes = require('../../constants/AppConstants').ActionTypes;

var KEY_CODE_ENTER = 13;

var Home = React.createClass({

  getInitialState: function() {
    return {
      entry: EntryStore.getRandomEntry(null),
      showDefinition: false
    };
  },

  fetchRandomEntry: function() {
    if (this.isMounted()) {
      var oldId = null;
      if (this.state.entry) {
        oldId = this.state.entry.id;
      }

      this.setState({
        entry: EntryStore.getRandomEntry(oldId),
        showDefinition: false
      });
    }
  },

  _onEntryChange: function(actionType, data) {
    if (actionType == ActionTypes.ENTRY_LOAD) {
      this.fetchRandomEntry();
    }

    if (actionType == ActionTypes.ENTRY_REMOVE) {
      console.log('Caught entry remove event');
      if (data.entry.id == this.state.entry.id) {
        this.fetchRandomEntry();
      }
    }

    if (actionType == ActionTypes.ENTRY_ADD) {
      if (this.isMounted()) {
        this.setState({
          entry: data.entry,
          showDefinition: true
        });
      }
    }
  },

  componentDidMount: function() {
    EntryStore.addChangeListener(this._onEntryChange);
    window.addEventListener('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function() {
    EntryStore.removeChangeListener(this._onEntryChange);
    window.removeEventListener('keydown', this.handleKeyDown);
  },

  handleKeyDown: function(event) {
    if (event.keyCode == KEY_CODE_ENTER) {
      this.toggle();
    }
  },

  toggle: function() {
    if (this.state.showDefinition) {
      this.fetchRandomEntry();
      return;
    }

    if (this.isMounted()) {
      this.setState({showDefinition: true});
    }
  },

  renderNoEntries: function() {
    return (
      <div id='home'>
        No entries
      </div>
    )
  },

  render: function() {
    var entry = this.state.entry;
    if (!entry) {
      return this.renderNoEntries();
    }

    var word = entry.word;
    var definitions = <p>???</p>;
    if (this.state.showDefinition) {
      definitions = entry.definitions.map(function(item) {
        var label = item.rank;
        if (item.part_of_speech) {
          label += ' (' + item.part_of_speech + ')';
        }
        label += ':';

        return (
          <div className='homeDefinition' key={item.id}>
            <p className='hDLabel'>{label}</p>
            <p className='hDText'>{item.text}</p>
          </div>
        );
      });
    }

    return (
      <div id='home'>
        <div id='homeWord'>
          <p>{word}</p>
        </div>
        <div id='homeDefinitions'>
          {definitions}
        </div>
      </div>
    );
  }
});

module.exports = Home;
