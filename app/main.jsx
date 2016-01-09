'use strict'

var React = window.React = require('react');
var router = require('./router.jsx');
var App = require('./components/App/App.comp.jsx');

function renderApp() {
  router.run(function(Handler) {
    React.render(<Handler/>, document.getElementById('appContainer'));
  });
}

renderApp();
