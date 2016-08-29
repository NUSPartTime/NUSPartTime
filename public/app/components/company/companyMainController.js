"use strict";

angular.module("nusPartimeApp").controller("companyMainController", ["$scope", "$location", "Session", "AuthService",
	function($scope, $location, Session, AuthService) {
		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isEmployer) {
				// direct to company registration
				$location.path("/");
			}
		});
	}]);