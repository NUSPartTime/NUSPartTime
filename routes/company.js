var express = require('express');
var router = express.Router();

/* GET company page. */
router.get('/', function(req, res, next) {
  res.render('company', { title: 'Ready to Hire?' });
});

module.exports = router;
