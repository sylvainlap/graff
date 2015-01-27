'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

module.exports = function(router) {

  router.route('/signup')

    .post(function(req, res, next) {
      var newUser = new User(req.body);
      newUser.provider = 'local';
      newUser.save(function(err, user) {
        console.log('new user: ' + user);
        if (err) {
          return next(err);
        }
        res.status(200).json(user);
      });
    });

  router.route('/signin')

    .post(passport.authenticate('local'), function(req, res, next) {
      //req.user.password = undefined;
      //req.user.salt = undefined;
      res.json(req.user);
    });

  router.route('/signout')

    .get(function(req, res, next) {
      req.logout();
      res.redirect('/');
    });

};
