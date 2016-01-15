'use strict'

var React = require('react');

var EntryActions = require('../../actions/Entry.actions.js');

var KEY_CODE_ENTER = 13;

var WordInput = React.createClass({

  getInitialState: function() {
    return {word: ''};
  },

  handleChange: function(event) {
    this.setState({word: event.target.value});
  },

  handleKeyDown: function(event) {
    if (event.keyCode == KEY_CODE_ENTER) {
      // TODO: Validate input (don't post blank for example)
      // TODO: Show spinner (remove later)

      Vocab.addWord(this.state.word).then(
        function(result) {
          EntryActions.addEntry(result.response);
          // TODO: Clear input, toast that word was added,
          // set state to display new word
        },
        function(err) {
          console.log('Error adding word:');
          console.log(err);
          // TODO: Clear input, toast that error occurred
        }
      );

      event.stopPropagation();
    }
  },

  render: function(){
    return (
      <div id='wordInput'>
        <input
          type='text'
          placeholder='Add Word'
          value={this.state.word}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}/>
      </div>
    );
  }
});

module.exports = WordInput;
