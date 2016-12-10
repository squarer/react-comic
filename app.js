var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/src', express.static(__dirname + '/src'));
app.use('/docs', express.static(__dirname + '/docs'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/docs/index.html'));
});

module.exports = app;
