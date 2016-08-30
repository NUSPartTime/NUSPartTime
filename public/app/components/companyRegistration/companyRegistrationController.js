"use strict";

angular.module("nusPartimeApp").controller("companyRegistrationController",
	["$scope", "RegistrationService", "AuthService", "Session",
	function($scope, RegistrationService, AuthService, Session) {
		AuthService.autoLogin();

		$scope.register = function() {
			/*
				stub
			*/
			// then register
			RegistrationService.registerCompany(Session.userId, $scope.name, $scope.contact, $scope.email);
		};
	}]);
