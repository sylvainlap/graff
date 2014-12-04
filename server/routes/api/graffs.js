'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var Graff = mongoose.model('Graff');

module.exports = function(router) {

  var requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(401).end();
    } else {
      next();
    }
  };

  router.route('/graffs')

    .post(requiresLogin, function(req, res, next) {
      var newGraff = new Graff(req.body);
      newGraff.save(function(err, graff) {
        if (err) {
          return next(err);
        }
        res.status(200).json(graff);
      });
    })

    .get(requiresLogin, function(req, res, next) {
      Graff.find(function(err, graffs) {
        if (err) {
          return next(err);
        }
        res.status(200).json(graffs);
      });
    });

  router.route('/graffs/:graffID')

    .get(requiresLogin, function(req, res, next) {
      Graff.findById(req.params.graffID).populate('_user').exec(function(err, graff) {
        if (err) {
          return next(err);
        }
        if (graff) {
          res.status(200).json(graff);
        } else {
          res.status(404).json({ message: 'Graff not found.' });
        }
      });
    })

    .put(requiresLogin, function(req, res, next) {
      Graff.findById(req.params.graffID, function(err, graff) {
        if (err) {
          return next(err);
        }
        if (graff) {
          graff = _.extend(graff, req.body);
          graff.save(function(err, graff) {
            if (err) {
              return next(err);
            }
            res.status(200).json(graff);
          });
        } else {
          res.status(404).json({ message: 'Graff not found.' });
        }
      });
    })

    .delete(requiresLogin, function(req, res, next) {
      Graff.findByIdAndRemove(req.params.graffID, function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).end();
      });
    });

};
