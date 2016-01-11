'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _entryData = null;

function _loadEntries(entryData) {
  _entryData = {};
  for (var i = 0; i < entryData.length; i++) {
    var entry = entryData[i];
    _entryData[entry.id] = entry;
  }
}

function _dropEntries() {
  _entryData = null;
}

function _addEntry(entry) {
  if (!_entryData) {_entryData = {};}
  _entryData[entry.id] = entry;
}

function _removeEntry(id) {
  delete _entryData[id];
  if (!Object.keys(_entryData).length) {
    _entryData = null;
  }
}

var EntryStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener: function(cb) { this.removeListener(CHANGE_EVENT, cb); },

  hasEntries: function() { return !!_entryData; },
  getEntryData: function() { return _entryData; },
});

EntryStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.ENTRY_LOAD:
      _loadEntries(action.data);
      EntryStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.ENTRY_DROP:
      _dropEntries();
      EntryStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.ENTRY_ADD:
      _addEntry(action.data);
      EntryStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.ENTRY_REMOVE:
      _removeEntry(action.data);
      EntryStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = EntryStore;
