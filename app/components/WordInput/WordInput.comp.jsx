'use strict'

var React = require('react');

var KEY_CODE_ENTER = 13;

var WordInput = React.createClass({

  handleKeyDown: function(event) {
    if (event.keyCode == KEY_CODE_ENTER) {
      console.log('Will POST word here...');
      event.stopPropagation();
    }
  },

  render: function(){
    return (
      <div id='wordInput'>
        <input
          type='text'
          placeholder='Add Word'
          onKeyDown={this.handleKeyDown}/>
      </div>
    );
  }
});

module.exports = WordInput;
