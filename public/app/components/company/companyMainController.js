"use strict";

angular.module("nusPartimeApp").controller("companyMainController",
	["$scope", "$location", "Session", "AuthService", "CompanyService", "JobService",
	function($scope, $location, Session, AuthService, CompanyService, JobService) {

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
				$(".all-company-button").addClass("active");

			});
		});

		$scope.reload = function() {
			location.reload();
		}
		
		// Converts status number to open or closed
		$scope.convertStatus = function(statusNumber) {
			return statusNumber == "0" ? "Open" : "Closed";
		}

		$scope.showAllContent = function($event) {
			if($event !== undefined) {
				$(".nav-side-bar li").removeClass('active');
				$($event.target).parent().addClass('active');
			}
			$scope.displayedJobs = $scope.allJobsArray;
		}

		$scope.showContent = function(index, $event) {
			$(".nav-side-bar li").removeClass('active');
			$($event.target).parent().addClass('active');
			$scope.displayedJobs = $scope.catJobsArray[index].jobs;
		}

		$scope.editJob = function(job){
			JobService.setJob(job);
			// should return to job view
			$location.path("/jobEdit");
		}

	}]);
