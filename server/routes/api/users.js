'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('underscore');

module.exports = function(router) {

  router.route('/users')

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
      // TODO, get the req.user instead of findById
      User.findById(req.params.userID, function(err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          user = _.extend(user, req.body);
          user.updated = Date.now();
          user.save(function(err, user) {
            if (err) {
              return next(err);
            }
            res.status(200).json(user);
          });
        } else {
          res.status(404).json({ message: 'User not found.' });
        }
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

};
