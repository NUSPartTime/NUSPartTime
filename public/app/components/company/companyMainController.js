'use strict';

angular.module("nusPartimeApp").controller("companyMainController", ["$scope", "$location", "Session", "AuthService",
	function($scope, $location, Session, AuthService) {
		AuthService.autoLogin();
		if (!Session.isEmployer) {
			$location.path("/");
		} else {
			// is employer
		}
	}]);