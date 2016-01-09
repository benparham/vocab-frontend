'use strict'

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./components/App/App.comp.jsx');
var Home = require('./components/Home/Home.comp.jsx');
var Login = require('./components/Login/Login.comp.jsx');
var NotFound = require('./components/NotFound/NotFound.comp.jsx');

var routes = (
	<Route>
		<Route handler={App}>
			<DefaultRoute name='home' handler={Home}/>
      <Route name='login' handler={Login}/>
		</Route>
		<NotFoundRoute handler={NotFound}/>
	</Route>
);

module.exports = routes;
