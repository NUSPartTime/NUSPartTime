var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET student page. */
router.get('/', function(req, res) {
  models.sequelize.Promise.all([
    models.Category.findAll(),
    models.Job.findAll({
      include: [models.JobCategory]
    })
  ]).spread(function(all_categories, all_jobs) {
    var cat_job_array = [];
    for (var category of all_categories) {
      var jobs = [];
      for (var job of all_jobs) {
        if (job.JobCategories[0].categoryId == category.id) {
          jobs.push(job);
        }
      }
      cat_job_array.push({
        category: category.name,
        category_html_class: category.name.replace(/ /g, ""),
        jobs: jobs
      });
    }
    console.log(cat_job_array);

    res.render('jobs', {
      title: 'Jobs Avaiable',
      cat_job_array: cat_job_array
    })
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
