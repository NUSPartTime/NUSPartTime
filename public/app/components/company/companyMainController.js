"use strict";

angular.module("nusPartimeApp").controller("companyMainController",
	["$scope", "$location", "Session", "AuthService", "CompanyService",
	function($scope, $location, Session, AuthService, CompanyService) {

		$scope.catJobsArray = [];
		$scope.allJobsArray = [];
		$scope.displayedJobs = [];

		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isEmployer) {
				// direct to company registration
				$location.path("/companyRegister");
			}
		}).then(function(){
			CompanyService.getAllJobs(Session.userId).then(function(res){
				$scope.catJobsArray = res;
				for (var catJobs of res) {
					$scope.allJobsArray = $scope.allJobsArray.concat(catJobs.jobs);
				}
				$scope.showAllContent();
				$("#all-jobs-button").focus();

			});
		});





		$scope.showAllContent = function() {
			$scope.displayedJobs = $scope.allJobsArray;
		}

		$scope.showContent = function(index) {
			$scope.displayedJobs = $scope.catJobsArray[index].jobs;
		}
	}]);
