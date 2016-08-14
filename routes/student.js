var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET student page. */
router.get('/', function(req, res) {
  models.Student.findAll().then(function(students) {
    res.render('student', {
      title: 'Student\'s page',
      students: students
    });
  });
});

/* POST student creation */
router.post('/create', function(req, res) {
  models.User.create({
    id: req.body.s_id
  });

  models.Student.create({
  	id: req.body.s_id,
  	UserId: req.body.s_id
  }).then(function() {
    res.redirect('/student');
  });
});

/* GET student destroyed */
router.get('/:student_id/destroy', function(req, res) {
  models.Student.destroy({
    where: {
      id: req.params.student_id
    }
  }).then(function() {
    res.redirect('/student');
  });
});

module.exports = router;
