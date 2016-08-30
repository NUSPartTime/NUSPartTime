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


module.exports = router;
