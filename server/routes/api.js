'use strict';

var express = require('express');

var router = express.Router()

router.route('/error').get(function(req, res, next) {
  next(new Error("pas bon !"));
});

module.exports = router;
