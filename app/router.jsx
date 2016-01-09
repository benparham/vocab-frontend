'use strict'

var Router = require('react-router');
var routes = require('./routes.jsx');

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

module.exports = router;
