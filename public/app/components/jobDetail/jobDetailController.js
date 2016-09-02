"use strict";

angular.module("nusPartimeApp").controller("jobDetailController",
	["$scope", "$sce", "JobService", "Session", "AuthService", "jobId",
	function($scope, $sce, JobService, Session, AuthService, jobId) {
		AuthService.autoLogin().then(function(res) {
			if (!res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			} else {
				$scope.identity = Session.isEmployer ? 'employer' : 'student';
				JobService.getJob(jobId, Session.userId).then(function(res) {
					var NO_DESC = "<strong>Oops!</strong> Currently there is no description. <br /> Please contact the company/project manager for more details."
					$scope.applicationStatus = res.applicationStatus;
					$scope.job = res.job;
					$scope.error = res.error;
					console.log($scope.job.description);
					if ($scope.job.description == null || $scope.job.description == "")
						$scope.description = $sce.trustAsHtml(NO_DESC);
					else
						$scope.description = $sce.trustAsHtml($scope.job.description.replace(/\n/g, "<br />"));

				});
			}
		});

		$scope.applyJob = function() {
			JobService.applyJob(jobId, Session.userId).then(function(res) {
				if (!res.error) {
					$scope.applicationStatus = res.applicationStatus;
				} else {
					console.log(res.error);
				}
			});
		}

		$scope.reapplyJob = function() {
			JobService.reapplyJob(jobId, Session.userId).then(function(res) {
				if (!res.error) {
					$scope.applicationStatus = res.applicationStatus;
				} else {
					console.log(res.error);
				}
			});
		}

		$scope.cancelApplication = function() {
			JobService.cancelJob(jobId, Session.userId).then(function(res) {
				if (!res.error) {
					$scope.applicationStatus = res.applicationStatus;
				} else {
					console.log(res.error);
				}
			});
		}
	}]);
