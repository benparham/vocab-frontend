'use strict'

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('react-router').Navigation;

var SessionStore = require('../../stores/Session.store.js');
var EntryActions = require('../../actions/Entry.actions.js');

var Header = require('../Header/Header.comp.jsx');

var App = React.createClass({
  statics: {
    willTransitionTo: function(transition) {
      if (!SessionStore.hasSession()) {
        transition.redirect('login');
      }
    }
  },

  mixins: [Navigation],

  getInitialState: function() {
    return {session: SessionStore.getSessionData()};
  },

  _onSessionChange: function() {
    if (SessionStore.hasSession()) {
      this.setState({
        session: SessionStore.getSessionData()
      });
    } else {
      this.transitionTo('login');
    }
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onSessionChange);

    Vocab.getAllEntries().then(
      function(result) {
        console.log('Retrieved entries:');
        console.log(result);
        EntryActions.loadEntries(result.response);
      },
      function(err) {
        console.log('Error retrieving entries:');
        console.log(err);
      }
    );
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onSessionChange);
  },

  render: function() {
    return (
      <div id='application'>
        <Header session={this.state.session}/>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
