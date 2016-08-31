"use strict";

angular.module("nusPartimeApp").controller("studentRegistrationController",
	["$scope", "RegistrationService", "AuthService", "Session",
	function($scope, RegistrationService, AuthService, Session) {
		AuthService.autoLogin();

		$scope.register = function() {
			
			/*
			// suppose to check validity of matric number, but failed
			RegistrationService.authenticateStudent($scope.matricNumber, $scope.pwd)
				.then(function(res) {
					console.log(res);
				})
			*/

			// then register
			RegistrationService.registerStudent(Session.userId, $scope.matricNumber);
		}
	}]);
