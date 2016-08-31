"use strict";

angular.module("nusPartimeApp").controller("jobEditController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "JobService",
	function($scope, $location, RegistrationService, AuthService, Session, JobService) {
		AuthService.autoLogin()
        .then(function(){
            JobService.getJobApplicationForm(Session.userId).then(function(res){
                $scope.categories = res.categories;
                $scope.companies = res.companies;

            });
        });
        $scope.currentJob = JobService.getCurrentJob();

        $scope.updateJob = function(){
            JobService.updateJob($scope.currentJob).then(function(res){
                $location.path("/job/"+$scope.currentJob.id);
            });
        }
	}]);
