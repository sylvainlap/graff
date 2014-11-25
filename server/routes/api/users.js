'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(router) {
  router.route('/users')

    .post(function(req, res, next) {
      var newUser = new User(req.body);
      newUser.save(function(err, user) {
        if (err) {
          return next(err);
        }
        res.status(200).json(user);
      });
    })

    .get(function(req, res, next) {
      User.find(function(err, users) {
        if (err) {
          return next(err);
        }
        res.status(200).json(users);
      });
    });

  router.route('/users/:userID')

    .get(function(req, res, next) {
      User.findById(req.params.userID, function(err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found.' });
        }
      })
    })

    .put(function(req, res, next) {
      User.findByIdAndUpdate(req.params.userID, req.body, function(err, user) {
        if (err) {
          return next(err);
        }
        res.status(200).json(user);
      });
    })

    .delete(function(req, res, next) {
      User.findByIdAndRemove(req.params.userID, function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).end();
      });
    });

}
