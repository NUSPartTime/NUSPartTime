"use strict";

angular.module("nusPartimeApp").controller("jobEditController",
	["$scope", "$filter", "$location", "RegistrationService", "AuthService", "Session", "JobService",
	function($scope, $filter, $location, RegistrationService, AuthService, Session, JobService) {
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

		$scope.convertToInt = function(s){
			return parseInt(s);
		};

        $scope.currentJob = JobService.getCurrentJob();
		$scope.updateJob = function(){
			swal("Success", "Job info updated!", "success");
            JobService.updateJob($scope.currentJob).then(function(res){
                $location.path("/job/"+$scope.currentJob.id);
            });
        }

		$scope.$watch("currentJob.applicationDeadline", function (newValue) {
			$scope.currentJob.applicationDeadline = $filter('date')(newValue, 'MMMM dd yyyy')
		});

		$scope.$watch("currentJob.deadline", function (newValue) {
			$scope.currentJob.deadline = $filter('date')(newValue, 'MMMM dd yyyy')
		});
	}]);
