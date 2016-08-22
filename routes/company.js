var express = require('express');
var models  = require('../models');
var router = express.Router();

/* GET company page. */
router.get('/', function(req, res, next) {
  res.render('company', { title: 'Ready to Hire?' });
});

router.post('/new_company', function(req, res){
  models.Company.create({
    name: req.body.name,
    phone: req.body.contact,
    email: req.body.email
  }).then(function(){
    res.redirect('/company');
  });
});

router.post('/new_job', function(req, res){
  models.Job.create({
    id: req.body.job_id
  }).then(function(){
    res.redirect('/company');
  });
});



module.exports = router;
