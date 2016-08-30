"use strict";

angular.module("nusPartimeApp").controller("jobDetailController", 
	["$scope", "JobService", "Session", "AuthService", "jobId", 
	function($scope, JobService, Session, AuthService, jobId) {
		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			} else {
				JobService.getJob(jobId, Session.userId).then(function(res) {
					console.log(res);
					$scope.applicationStatus = res.applicationStatus;
					$scope.job = res.job;
					$scope.error = res.error;
				});
			}
		});

		$scope.applyJob = function() {

		}

		$scope.reapplyJob = function() {
			
		}

		$scope.cancelApplication = function() {
			
		}
	}]);
