var express = require('express');
var router = express.Router();

const ROUTE_NAME = 'introduction';

router.get('/', function (req, res, next) {
  res.render(ROUTE_NAME + '/introduction');
});

router.get('/events', function (req, res, next) {
  res.render(ROUTE_NAME + '/events');
});

router.get('/group', function (req, res, next) {
  res.render(ROUTE_NAME + '/group');
});

module.exports = router;