'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var auth = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
     done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne().where('username', username).select('+password +salt').exec(function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) { // TODO message vraiment utile ?
        return done(null, false, { message: 'Unknown user or invalid password' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Unknown user or invalid password' });
      }
      return done(null, user);
    });
  }));
};

module.exports = auth;
