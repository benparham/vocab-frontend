'use strict'

var keyMirror = require('react/lib/keyMirror');

module.exports = {
	ActionTypes: keyMirror({
		// Session
		SESSION_LOAD: null,
    SESSION_DROP: null,
	}),

	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		CLIENT_ACTION: null
	})
};
