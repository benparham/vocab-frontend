'use strict'

var React = require('react');

var classNames = require('classnames');

var Toast = React.createClass({

  TIMEOUT_MS: 2000,

  getInitialState: function() {
    return {
      status: null,
      message: null,
      show: false
    };
  },

  toast: function(message, status) {
    this.setState({
      status: status,
      message: message,
      show: true
    });

    setTimeout(function() {
      this.setState({
        status: null,
        message: null,
        show: false
      });
    }.bind(this), this.TIMEOUT_MS);
  },

  componentDidMount: function() {
    window.toastMessage = function(message) {
      this.toast(message, 'message');
    }.bind(this);

    window.toastWarning = function(message) {
      this.toast(message, 'warning');
    }.bind(this);

    window.toastError = function(message) {
      this.toast(message, 'error');
    }.bind(this);
  },

  componentWillUnmount: function() {
    delete window.toastMessage;
    delete window.toastWarning;
    delete window.toastError;
  },

  render: function() {
    return (
      <div id='toast' className={classNames({show: this.state.show}, this.state.status)}>
        <p>{this.state.message}</p>
      </div>
    );
  }
});

module.exports = Toast;
