var express = require('express');
var models  = require('../models');
var router = express.Router();

/* GET company page. */
router.get('/', function(req, res){

  var sess = req.session;
  var userId = sess.user_id;

  models.sequelize.Promise.all([
    models.Job.findAll({
      include: [models.Company]
    }),
    models.CompanyContact.findAll({
      where: {
        employerId: userId
      },
      include: [models.Company]
    })
  ]).spread(function(all_jobs, all_companyContact){
    var cat_job_array = [];
    for(var contact of all_companyContact){
      var jobs = [];
      for(var job of all_jobs){
        if(job.Company.id == contact.companyId){
          jobs.push(job);
        }
      }

      cat_job_array.push({
        company: contact.Company.name,
        company_html_class: contact.Company.name.replace(/ /g, ""),
        jobs: jobs
      });
    }

      res.render('company',
       { title: "My Posted Jobs" ,
        cat_job_array: cat_job_array});
  });

});

router.get('/new_company', function(req, res, next) {
  res.render('new_company', { title: 'Ready to Hire?' });
});

router.post('/new_company', function(req, res){
  var Company = require('../models/company');
  models.Employer.findOrCreate({
    where: {
      id: req.session.user_id
    }
  }).then(function() {
    models.CompanyContact.create({
      employerId: req.session.user_id,
      Company:{
        name: req.body.name,
        phone: req.body.contact,
        email: req.body.email
      }
    },{
      include: [models.Company]
    }).then(function(){
      res.redirect('/company');
    });
  });
});

router.get('/new_job', function(req, res){
  var userId = req.session.user_id;
  var companies = {};
  var categories = {};
  models.sequelize.Promise.all([
    models.CompanyContact.findAll({
      where: {
        employerId: userId
      }
    }),
    models.Company.findAll(),
    models.Category.findAll()
  ]).spread(function(all_companyContact, all_company, all_categories){
    if(all_companyContact == null){
      console.log('company does not exist');
    }else{

      for(var contact of all_companyContact){
        for(var company of all_company){
          if(company.id == contact.companyId){
            companies[company.id] = company.name;
          }
        }
      }

      for(var category of all_categories){
        categories[category.id] = category.name;
      }

    }
    res.render('post_job', {companies: companies, categories: categories});
  });


});

// need to add default value for some of the fields
router.post('/new_job', function(req, res){
  var Job = models.Job;
  models.JobCategory.create({
    Job: {
      companyId: req.body.companyId,
      title: req.body.title,
      status: req.body.status,
      salary: req.body.salary,
      description: req.body.description,
      applicationDeadline: req.body.application_deadline,
      deadline: req.body.deadline
    },
    categoryId: req.body.categoryId

  },{
    include: [models.Job]
  }).then(function(){
    res.redirect('/company');
  });
});



module.exports = router;
