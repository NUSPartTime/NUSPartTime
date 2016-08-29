'use strict';

angular.module("nusPartimeApp").controller("studentMainController", ["$scope", "$location", "Session", "AuthService",
	function($scope, $location, Session, AuthService) {
		if (AuthService.isAuthenticated()) {
			if (!Session.userId) {
				// login using cookie
				AuthService.autoLogin().then(function(res) {
					if (!Session.isStudent) {
						console.log("not student 2");
						// $location.path("/");
					} else {
						
					}
				});
			} else {
				if (!Session.isStudent) {
					console.log("not student");
					// $location.path("/");
				} else {

				}
			}
		} else {
			console.log("not authenticated");
			$location.path("/");
		}
	}]);