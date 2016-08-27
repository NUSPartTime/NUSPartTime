var models  = require('../models');
var express = require('express');
var router = express.Router();

var auth = function(req, res, next) {
  if (req.session && req.session.is_student)
    return next();
  else
    return res.sendStatus(401);
};

/* GET student page. */
router.get('/', auth, function(req, res) {
  console.log(req.session.user_id);

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

module.exports = router;
