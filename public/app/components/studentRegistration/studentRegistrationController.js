"use strict";

angular.module("nusPartimeApp").controller("studentRegistrationController",
	["$scope", "RegistrationService", "AuthService", "Session",
	function($scope, RegistrationService, AuthService, Session) {
		AuthService.autoLogin();

		$scope.register = function() {
			
			
			// suppose to check validity of matric number, but failed
			RegistrationService.authenticateStudent($scope.matricNumber, $scope.pwd)
				.then(function(res) {
					console.log(res);
					if (res.isAuthentified) {
						console.log("Student is authentified.");
						RegistrationService.registerStudent(Session.userId, $scope.matricNumber);
					} else {
						console.log("Student is not authentified.");
					}
				});
		}
	}]);
