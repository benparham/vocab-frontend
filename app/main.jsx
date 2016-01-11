'use strict'

var React = window.React = require('react');
var router = require('./router.jsx');
var App = require('./components/App/App.comp.jsx');

var SessionActions = require('./actions/Session.actions.js');

function renderApp() {
  router.run(function(Handler) {
    React.render(<Handler/>, document.getElementById('appContainer'));
  });
}

Vocab.getSession().then(
  function(result) {
    SessionActions.loadSession(result.response);
    renderApp();
  },
  function(err) {
    renderApp();
  }
);
