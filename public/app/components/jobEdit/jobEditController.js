"use strict";

angular.module("nusPartimeApp").controller("jobEditController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "JobService",
	function($scope, $location, RegistrationService, AuthService, Session, JobService) {
		AuthService.autoLogin()
        .then(function(){
            JobService.getJobApplicationForm(Session.userId).then(function(res){
                $scope.categories = res.categories;
                $scope.companies = res.companies;

				$(function() {
					$(".datepicker").datepicker();
				});
            });
        });
        $scope.currentJob = JobService.getCurrentJob();
		$scope.comId = $scope.currentJob.companyId;
		$scope.updateJob = function(){
            JobService.updateJob($scope.currentJob).then(function(res){
                $location.path("/job/"+$scope.currentJob.id);
            });
        }
	}]);
