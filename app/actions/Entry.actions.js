'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var EntryActions = {
  loadEntries: function(entryData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.ENTRY_LOAD,
      data: entryData
    });
  },

  dropEntries: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.ENTRY_DROP
    });
  },

  addEntry: function(entry) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.ENTRY_ADD,
      data: entry
    });
  },

  removeEntry: function(entryId) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.ENTRY_REMOVE,
      data: entryId
    });
  }
}

module.exports = EntryActions;
