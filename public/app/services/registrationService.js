'use strict';

angular.module("nusPartimeApp").factory("RegistrationService", ["$http", "$location", "Session",
	function ($http, $location, Session) {
		var registrationService = {};

		registrationService.registerStudent = function(userId, matricNumber) {
			var postParam = {
				userId: userId,
				matricNumber: matricNumber
			};
			return $http.post("/userManagement/login", postParam)
						.then(function(res) {
							Session.isStudent = true;
							// redirect to student page if successful
							$location.path("/student");
						})
		}

		return registrationService;
	}]);