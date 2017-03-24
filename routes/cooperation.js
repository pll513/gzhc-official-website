var express = require('express');
var router = express.Router();

const ROUTE_NAME = 'cooperation';

router.get('/wisdom-hospital', function (req, res, next) {
  res.render(ROUTE_NAME + '/wisdom-hospital');
});

router.get('/cloud-hospital', function (req, res, next) {
  res.render(ROUTE_NAME + '/cloud-hospital');
});

router.get('/hifond', function (req, res, next) {
  res.render(ROUTE_NAME + '/hifond');
});

router.get('/cloud-speed', function (req, res, next) {
  res.render(ROUTE_NAME + '/cloud-speed');
});

router.get('/hicare', function (req, res, next) {
  res.render(ROUTE_NAME + '/hicare');
});

module.exports = router;
