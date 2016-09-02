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
			var newCompanyMessage = $scope.name + " has been successfully created!";
			swal("Success", newCompanyMessage, "success")
			RegistrationService.registerCompany(Session.userId, $scope.name, $scope.contact, $scope.email);
		};
	}]);
