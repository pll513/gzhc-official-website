var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/introduction', function (req, res, next) {
  res.render('introduction');
});

router.get('/events', function (req, res, next) {
  res.render('events');
});

router.get('/cooperative-patterns', function (req, res, next) {
  res.render('cooperative-patterns');
});

module.exports = router;
