"use strict";

angular.module("nusPartimeApp").controller("studentMainController", ["$scope", "$location", "Session", "AuthService",
	function($scope, $location, Session, AuthService) {
		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			}
		});
		
	}]);