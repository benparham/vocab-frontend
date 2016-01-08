'use strict';

var express = require('express');
var historyApiFallback = require('connect-history-api-fallback');

var app = new express();

app.set('port', 8080);
app.use(historyApiFallback());
app.use(express.static(__dirname + '/../public'));

app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
