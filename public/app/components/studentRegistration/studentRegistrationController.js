'use strict';

angular.module("nusPartimeApp").controller("studentRegistrationController", 
	["$scope", "RegistrationService", "AuthService", "Session",
	function($scope, RegistrationService, AuthService, Session) {
		AuthService.autoLogin();
		$scope.register = function() {
			console.log($scope.matricNumber);
			// suppose to check validity of matric number
			// then register
			RegistrationService.registerStudent(Session.userId, $scope.matricNumber)
		}
	}]);