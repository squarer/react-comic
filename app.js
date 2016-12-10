var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/src', express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));
app.set('views', __dirname + '/dist');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

module.exports = app;
