'use strict'

var Dispatcher = require('flux').Dispatcher;
var PayloadSources = require('../constants/AppConstants.js').PayloadSources;

var AppDispatcher = new Dispatcher();

AppDispatcher.handleServerAction = function(action) {
  this.dispatch({
    source: PayloadSources.SERVER_ACTION,
    action: action
  });
}

AppDispatcher.handleClientAction = function(action) {
  this.dispatch({
    source: PayloadSources.CLIENT_ACTION,
    action: action
  });
}

module.exports = AppDispatcher;
