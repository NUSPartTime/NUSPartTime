"use strict";

angular.module("nusPartimeApp").controller("studentRegistrationController",
	["$scope", "RegistrationService", "AuthService", "Session",
	function($scope, RegistrationService, AuthService, Session) {
		AuthService.autoLogin();
		$scope.isError = false;
		$scope.register = function() {
			RegistrationService.authenticateStudent($scope.matricNumber, $scope.pwd)
				.then(function(res) {
					console.log(res);
					if (res.isAuthentified) {
						console.log("Student is authentified.");
						$scope.isError = false;
						RegistrationService.registerStudent(Session.userId, $scope.matricNumber);
					} else {
						console.log("Student is not authentified.");
						$scope.isError = true;
					}
				});
		}
	}]);
