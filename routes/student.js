var express = require('express');
var router = express.Router();

/* GET student page. */
router.get('/', function(req, res, next) {
  res.render('student', { title: 'Find a job' });
});

module.exports = router;
