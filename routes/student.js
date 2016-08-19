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
  ]).spread(function(categories, jobs) {
    var cat_job_array = [];
    for (var category of categories) {
      var tmp_jobs = [];
      for (var job of jobs) {
        if (job.JobCategories[0].categoryId == category.id) {
          tmp_jobs.push(job);
        }
      }
      cat_job_array.push({category: category.name, jobs: tmp_jobs});
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
