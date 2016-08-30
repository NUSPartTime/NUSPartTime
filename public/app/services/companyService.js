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

    return companyService;
});
