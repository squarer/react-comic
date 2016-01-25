var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.API_HOST || ''));
app.use('/src', express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));
app.set('views', __dirname + '/dist');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index', {host: app.get('host')});
});

module.exports = app;
