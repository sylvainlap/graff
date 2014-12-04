'use strict';

var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');
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
  app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(session({
    name: config.get('sessionName'),
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: true
  }));

  // Initialize the models
  require('./models/user');
  require('./models/graff');

  // Initialize Passport strategies
  app.use(passport.initialize());
  app.use(passport.session());
  require('./lib/auth')();

  // Initialize the view engine
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('view cache', false);
  app.set('views', __dirname + '/views');

  // Initialize static folder
  app.use(express.static('./client'));

  // Initialize the routes
  app.use('/api', require('./routes/api'));
  app.use('/admin', require('./routes/admin'));
  app.use('/', require('./routes/frontend'));

  // Error handling
  app.use(function(err, req, res, next) {
    if (!err) {
      return next();
    } else {
      console.error(err.stack);
      return res.status(500).json({ message: err.message });
    }
  });
  app.use(function(req, res) {
    return res.status(404).render('404');
  });

  // Start the server
  app.listen(config.get('port'));

  // Logging
  console.log('--');
  console.log('Graff started.');
  console.log('Environment: ' + config.get('env'));
  console.log('Port: ' + config.get('port'));
  console.log('Database: ' + config.get('db'));
  console.log('--');
};
