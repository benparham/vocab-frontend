'use strict'

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./components/App/App.comp.jsx');
var Home = require('./components/Home/Home.comp.jsx');
var Dashboard = require('./components/Dashboard/Dashboard.comp.jsx');
var Login = require('./components/Login/Login.comp.jsx');
var NotFound = require('./components/NotFound/NotFound.comp.jsx');

var routes = (
	<Route>
		<Route path='/' name='app' handler={App}>
			<DefaultRoute name='home' handler={Home}/>
			<Route name='dashboard' handler={Dashboard}/>
		</Route>
		<Route path='/login' name='login' handler={Login}/>
		<NotFoundRoute handler={NotFound}/>
	</Route>
);

module.exports = routes;
