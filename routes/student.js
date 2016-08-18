var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET student page. */
router.get('/', function(req, res) {
  // models.sequelize.Promise.all([
  //   models.Category.findAll(),
  //   models.MenuItems.Job.findAll()
  // ]).speard(function(categories, jobs) {
  // });
  
  models.Category.findAll().then(function(all_cats) {
    models.Job.findAll().then(function(all_jobs) {
      res.render('jobs', {
        title: 'Jobs Avaiable',
        categories: all_cats,
        jobs: all_jobs
      });
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
