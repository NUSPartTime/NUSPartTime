"use strict";

angular.module("nusPartimeApp").controller("jobDetailController",
	["$scope","$location", "$sce", "JobService", "UserService", "Session", "AuthService", "jobId",
	function($scope, $location ,$sce, JobService, UserService, Session, AuthService, jobId) {
		AuthService.autoLogin().then(function(res) {
			if (!res.isRegistered) {
				$location.path("/");
			} else {
				JobService.getJob(jobId, Session.userId).then(function(res) {
					var NO_DESC = "<strong>Oops!</strong> Currently there is no description. <br /> Please contact the company/project manager for more details.";
					$scope.job = res.job;
					$scope.error = res.error;
					$scope.isOwner = res.isOwner;

					if (res.isOwner) {
						// get list of student who has applied the job
						$scope.applicantList = res.applicants;
						var nameMap = {};
						for (var i=0; i<$scope.applicantList.length; i++) {
							nameMap[$scope.applicantList[i].id] = i;
						}
						for (var applicant of $scope.applicantList) {
							UserService.getUserProfile(applicant.id).then(function(res) {
								var index = nameMap[res.id];
								$scope.applicantList[index].name = res.name;
							});
						}
					} else {
						// get the information about the owner of the job
						$scope.applicationStatus = res.applicationStatus;
						$scope.employerInfo = res.employer;
					}

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
				console.log(res);
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

		$scope.toggleJobStatus = function() {
			if ($scope.job.status === 0) {
				// open status -> close status
				$scope.job.status = 1;
				JobService.updateJob($scope.job).then(function(res) {
				});
			} else {
				// close status -> open status
				$scope.job.status = 0;
				JobService.updateJob($scope.job).then(function(res) {
				});
			}
		}
	}]);
