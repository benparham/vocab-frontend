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

  _clearInput: function() {
    if (this.isMounted()) {
      this.setState({word: ''})
    }
  },

  handleKeyDown: function(event) {
    if (event.keyCode == KEY_CODE_ENTER) {
      if (this.state.word == '') {
        return;
      }

      Vocab.addWord(this.state.word).then(
        function(result) {
          EntryActions.addEntry(result.response);
          this._clearInput();
          // alert('Added word: ' + result.response.word);
        }.bind(this),
        function(err) {
          console.log('Error adding word:');
          console.log(err);
          this._clearInput();
          // alert(err);
        }.bind(this)
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
