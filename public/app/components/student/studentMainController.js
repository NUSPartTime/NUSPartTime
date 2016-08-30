"use strict";

angular.module("nusPartimeApp").controller("studentMainController", 
	["$scope", "$location", "Session", "AuthService", "DataRetrievalService",
	function($scope, $location, Session, AuthService, DataRetrievalService) {
		$scope.catJobsArray = [];

		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			}
		});
		
		DataRetrievalService.getAllJobs().then(function(res) {
			console.log(res);
			$scope.catJobsArray = res;
		})

		$scope.showAllContent() = function() {

		}

		$scope.showContent() = function(index) {

		}
	}]);