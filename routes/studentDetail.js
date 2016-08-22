var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  var is_authorized = false;
  var sess = req.session;
  if (sess.user_id) {
    is_authorized = true;
  } else {

  }

  res.render('student_detail', {
    title: 'Your Personal Information',
  });
});

module.exports = router;
