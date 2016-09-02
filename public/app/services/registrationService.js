"use strict";

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

		registrationService.authenticateStudent = function(matricNumber, pwd) {
			var postParam = {
				matricNumber: matricNumber,
				password: pwd
			};
			return $http.post("/userManagement/authenticateStudent", postParam)
						.then(function(res) {
							return {isAuthentified: res.data.status};
						});
		}

		registrationService.registerStudent = function(userId, matricNumber, resume) {
			var postParam = {
				userId: userId,
				matricNumber: matricNumber,
				resume: resume
			};
			return $http.post("/userManagement/createNewStudent", postParam)
						.then(function(res) {
							Session.isStudent = true;
							// redirect to student page if successful
							$location.path("/student");
						});
		}

		registrationService.registerCompany = function(userId, name, contact, email){
			var postParam = {
				userId: userId,
				name: name,
				contact: contact,
				email: email
			};

			return $http.post("companyManagement/createNewCompany", postParam)
						.then(function(res){
							Session.isEmployer = true;

							$location.path("/company");
						});
		}

		return registrationService;
	}]);
