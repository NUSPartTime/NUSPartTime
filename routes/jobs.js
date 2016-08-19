var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET job with certain ID */
router.get('/:job_id/details', function(req, res) {
  models.Job.findAll({
    where: {
      id: req.params.job_id
  	}
  }).then(function(jobs) {
    //res.render('view name',{defining view attributes})
    res.render('job', {
      title: 'Job Details',
      jobs: jobs
    });
  });
});

module.exports = router;
