'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var SessionActions = {
  loadSession: function(sessionData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SESSION_LOAD,
      data: sessionData
    });
  },

  dropSession: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.SESSION_DROP
    });
  }
}

module.exports = SessionActions;
