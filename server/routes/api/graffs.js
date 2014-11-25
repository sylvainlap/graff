'use strict';

var mongoose = require('mongoose');
var Graff = mongoose.model('Graff');

module.exports = function(router) {
  router.route('/graffs')

    .post(function(req, res, next) {
      var newGraff = new Graff(req.body);
      newGraff.save(function(err, graff) {
        if (err) {
          return next(err);
        }
        res.status(200).json(graff);
      });
    })

    .get(function(req, res, next) {
      Graff.find(function(err, graffs) {
        if (err) {
          return next(err);
        }
        res.status(200).json(graffs);
      });
    });

  router.route('/graffs/:graffID')

    .get(function(req, res, next) {
      Graff.findById(req.params.graffID).populate('_user').exec(function(err, graff) {
        if (err) {
          return next(err);
        }
        if (graff) {
          res.status(200).json(graff);
        } else {
          res.status(404).json({ message: 'Graff not found.' });
        }
      })
    })

    .put(function(req, res, next) {
      Graff.findByIdAndUpdate(req.params.graffID, req.body, function(err, graff) {
        if (err) {
          return next(err);
        }
        // TODO need to save ?
        res.status(200).json(graff);
      });
    })

    .delete(function(req, res, next) {
      Graff.findByIdAndRemove(req.params.graffID, function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).end();
      });
    });

}
