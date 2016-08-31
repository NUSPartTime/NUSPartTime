"use strict"

angular.module("nusPartimeApp").factory("CompanyService", function($http, $location, Session) {
    var companyService = {};

    companyService.getAllJobs = function(userId){
        var postParam = {
            userId: userId
        };
        return $http.post("/companyManagement/allJobs", postParam).then(function(res){
            return JSON.parse(res.data.catJobArray);
        });
    }

    companyService.getAllCompanies = function(userId){
        var postParam = {
            id: userId
        }

        return $http.post("/companyManagement/getAllCompanies", postParam).then(function(res){
            return res.data.companies;
        });
    }

    companyService.getCompanyProfile = function(companyId){
        var postParam = {
            id: companyId
        }

        return $http.post("/companyManagement/getCompanyProfile", postParam).then(function(res){
            return res.data;
        });
    }

    companyService.currentCompany = {};
    companyService.setCompany = function(company){
        companyService.currentCompany = company;
    }

    companyService.getCompany = function(){
        return companyService.currentCompany;
    }

    companyService.updateCompanyProfile = function(postParam){
        return $http.post("/companyManagement/updateCompanyProfile", postParam).then(function(res){
            return res.data;
        });
    }

    return companyService;
});
