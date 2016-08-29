'use strict';

angular.module("nusPartimeApp").factory("RegistrationService", ["$http", "$location", "Session",
	function ($http, $location, Session) {
		var registrationService = {};

		registrationService.registerUser = function(userId, name) {
			var postParam = {
				userId: userId,
				name: name
			};
			return $http.post("/userManagement/createNewUser", postParam)
						.then(function(res) {
							console.log("response from server register user: ");
							console.log(res.data);
							return {status: res.data.status};
						});
		}

		registrationService.registerStudent = function(userId, matricNumber) {
			var postParam = {
				userId: userId,
				matricNumber: matricNumber
			};
			return $http.post("/userManagement/createNewStudent", postParam)
						.then(function(res) {
							Session.isStudent = true;
							// redirect to student page if successful
							$location.path("/student");
						})
		}

		return registrationService;
	}]);