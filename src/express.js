var express = require('express');
var app = express();
const mongoose=require('mongoose');
var url = "mongodb://localhost:27017/test";
mongoose.connect(url);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});