var settings = {
  location: 'localhost',
  port: 3000
}

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(settings.port, settings.location, function(err) {
  if (err) {
    console.log(err);
    return;
  }

    console.info("Now serving on http://%s:%s/", settings.location, settings.port)
});
