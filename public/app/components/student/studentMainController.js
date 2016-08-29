'use strict';

angular.module("nusPartimeApp").controller("studentMainController", ["$scope", "$location", "Session", "AuthService",
	function($scope, $location, Session, AuthService) {
		AuthService.autoLogin();
		if (!Session.isStudent) {
			$location.path("/studentRegister");
		} else {
			// is student
		}
	}]);