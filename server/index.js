'use strict';

var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var expressWinston = require('express-winston');
var swig = require('swig');

var config = require('./lib/config');
var logger = require('./lib/logger');

var api = require('./routes/api');
var admin = require('./routes/admin');
var frontend = require('./routes/frontend');

module.exports.start = function() {
  // Initialize express app
  var app = express();

  // Initialize local variables
  app.locals.title = config.get('title');
  app.locals.description = config.get('description');

  // Initialize middlewares
  app.use(compression());
  app.use(expressWinston.logger({
    winstonInstance: logger,
    expressFormat: true
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Initialize the view engine
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('view cache', false);
  app.set('views', __dirname + './server/views');

  // Initialize the routes
  app.use('/api', api);
  app.use('/admin', admin);
  app.use('/', frontend);

  // TODO
  //error handler (log + render)

  // Start the server
  app.listen(config.get('port'));
  logger.info('Graff is running at http://' + config.get('ip') + ':' + config.get('port') + '/.');
}
