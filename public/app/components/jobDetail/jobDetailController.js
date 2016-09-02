"use strict";

angular.module("nusPartimeApp").controller("jobDetailController",
	["$scope", "$sce", "JobService", "Session", "AuthService", "jobId",
	function($scope, $sce, JobService, Session, AuthService, jobId) {
		AuthService.autoLogin().then(function(res) {
			$scope.isOwner = true;
			console.log(Session);
			if (res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			} else {
				JobService.getJob(jobId, Session.userId).then(function(res) {
					var NO_DESC = "<strong>Oops!</strong> Currently there is no description. <br /> Please contact the company/project manager for more details."
					$scope.job = res.job;
					$scope.error = res.error;
					$scope.isOwner = res.isOwner;

					if (res.isOwner) {
						// get list of student who has applied the job
						$scope.applicantList = res.data.applicants;
					} else {
						// get the information about the owner of the job
						$scope.applicationStatus = res.data.applicationStatus;
						$scope.employerInfo = res.data.employer;
					}

					console.log($scope.job.description);
					if ($scope.job.description == null || $scope.job.description == "")
						$scope.description = $sce.trustAsHtml(NO_DESC);
					else
						$scope.description = $sce.trustAsHtml($scope.job.description.replace(/\n/g, "<br />"));
					$("[name='my-checkbox']").bootstrapSwitch();
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

		$scope.editJob = function(job){
			JobService.setJob(job);
			// should return to job view
			$location.path("/jobEdit");
		}

		$scope.directToApplicant = function(userId) {
			// should direct to applicant main page via get method...
		}
	}]);
