"use strict";

angular.module("nusPartimeApp").controller("jobDetailController", 
	["$scope", "DataRetrievalService", "Session", "AuthService", "jobId", 
	function($scope, DataRetrievalService, Session, AuthService, jobId) {
		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			} else {
				DataRetrievalService.getJob(jobId, Session.userId).then(function(res) {
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
