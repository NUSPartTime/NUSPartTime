"use strict";

angular.module("nusPartimeApp").controller("studentMainController",
	["$scope", "$location", "Session", "AuthService", "JobService",
	function($scope, $location, Session, AuthService, JobService) {
		$scope.catJobsArray = [];
		$scope.allJobsArray = [];
		$scope.displayedJobs = [];

		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			}
		});

		JobService.getAllJobs().then(function(res) {
			$scope.catJobsArray = res;
			for (var catJobs of res) {
				$scope.allJobsArray = $scope.allJobsArray.concat(catJobs.jobs);
			}
			$scope.showAllContent();
			$("#all-jobs-button").focus();
		});

		$scope.showAllContent = function() {
			$scope.displayedJobs = $scope.allJobsArray;
		}

		$scope.showContent = function(index) {
			$scope.displayedJobs = $scope.catJobsArray[index].jobs;
		}
	}]);