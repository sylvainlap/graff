'use strict';

var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var expressWinston = require('express-winston');
var passport = require('passport');
var swig = require('swig');

var config = require('./lib/config');
var logger = require('./lib/logger');
var db = require('./lib/database');

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
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  // Initialize the models
  require('./models/user');
  require('./models/graff');
  logger.info('Models loaded.');

  // Initialize Passport strategies
  app.use(passport.initialize());
  require('./lib/auth')();

  // Initialize the view engine
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('view cache', false);
  app.set('views', __dirname + '/views');

  // Initialize the routes
  app.use('/api', require('./routes/api'));
  app.use('/admin', require('./routes/admin'));
  app.use('/', require('./routes/frontend'));
  logger.info('Routes loaded.');

  // Error handling
  app.use(function(err, req, res, next) {
    if (!err) {
      next();
    } else {
      logger.error(err.stack);
      return res.status(500).json({ message: err.message });
    }
  });
  app.use(function(req, res) {
    return res.status(404).render('404');
  });

  // Start the server
  app.listen(config.get('port'));
  logger.info('Graff is running at http://' + config.get('ip') + ':' + config.get('port') + '/.');
}
