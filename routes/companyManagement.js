var models = require('../models');
var express = require('express');
var router = express.Router();

router.post("/allJobs", function(req, res) {
    var userId = req.body.userId;
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
    ]).spread(function(allJobs, allCompanyContact) {
        var catJobArray = [];
        for (var contact of allCompanyContact) {
            var jobs = [];
            for (var job of allJobs) {
                if (job.Company.id == contact.companyId) {
                    jobs.push(job);
                }
            }

            catJobArray.push({
                company: contact.Company.name,
                companyHtmlClass: contact.Company.name.replace(/ /g, ""),
                jobs: jobs
            });
        }

        res.send({
            catJobArray: JSON.stringify(catJobArray)
        });
    });
});

router.post("/createNewCompany", function(req, res) {
    var Company = require('../models/company');
    models.Employer.findOrCreate({
        where: {
            id: req.body.userId
        }
    }).then(function() {
        models.CompanyContact.create({
            employerId: req.body.userId,
            Company: {
                name: req.body.name,
                phone: req.body.contact,
                email: req.body.email
            }
        }, {
            include: [models.Company]
        }).then(function() {
            res.send({
                redirect: '/company'
            });
        });
    });
});

router.post("/getCompanyProfile", function(req, res){
    models.Company.findOne({
        where:{
            id: req.body.id
        }
    }).then(function(company){
        res.send({company: company});
    });
});

router.post("/getAllCompanies", function(req, res){
    var userId = req.body.id;
    models.CompanyContact.findAll({
        where:{
            employerId: userId
        },
        include: [models.Company]
    }).then(function(allCompanyContacts){
        var companies = [];
        for(var contact of allCompanyContacts){
            companies.push(contact.Company);
        }
        res.send({
            companies: companies
        })
    });
});


module.exports = router;
