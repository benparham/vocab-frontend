'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _entryData = null;

function _loadEntries(entryData) { _entryData = entryData; }
function _dropEntries() { _entryData = null; }

function _findEntryIdx(id) {
  for (var i = 0; i < _entryData.length; i++) {
    if (_entryData[i].id == id) {
      return i;
    }
  }
  return null;
}

function _findEntryByIdx(idx) {
  if (!_entryData) { return null; }
  if (_entryData.length - 1 < idx) { return null; }
  return _entryData[idx];
}

function _findEntryById(id) {
  var idx = _findEntryIdx(id);
  if (idx) { return _findEntryByIdx(idx); }
  return null;
}

function _addEntry(entry) {
  var idx = _findEntryIdx(entry.id);
  if (idx) {
    _entryData[idx] = entry;
    return entry;
  }

  _entryData.push(entry);
  return entry;
}

function _removeEntry(id) {
  var idx = _findEntryIdx(id);
  if (idx) {
    var removed = _entryData.splice(idx, 1);
    return removed[0];
  }

  return null;
}

function _getRandomIdx() {
  if (!_entryData) { return -1; }
  return Math.floor(Math.random() * _entryData.length)
}

var EntryStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener: function(cb) { this.removeListener(CHANGE_EVENT, cb); },

  hasEntries: function() { return !!_entryData; },
  getEntryData: function() { return _entryData; },
  getEntry: function(id) { return _findEntryById(id); },
  getRandomEntry: function(oldId) {
    if (!_entryData) { return null; }

    var oldIdx = null;
    if (oldId) {
      oldIdx = _findEntryIdx(oldId);
    }

    var randIdx = _getRandomIdx();

    while (_entryData.length > 1 && oldIdx != null && oldIdx == randIdx) {
      randIdx = _getRandomIdx();
    }

    return _findEntryByIdx(randIdx);
  }
});

EntryStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  var emitData = {};

  switch(action.actionType) {
    case ActionTypes.ENTRY_LOAD:
      _loadEntries(action.data);
      break;
    case ActionTypes.ENTRY_DROP:
      _dropEntries();
      break;
    case ActionTypes.ENTRY_ADD:
      emitData['entry'] = _addEntry(action.data);
      break;
    case ActionTypes.ENTRY_REMOVE:
      emitData['entry'] = _removeEntry(action.data);
      if (!emitData.entry) { return false; }
      break;
    default:
      return true;
  }

  EntryStore.emit(CHANGE_EVENT, action.actionType, emitData);
});

module.exports = EntryStore;
