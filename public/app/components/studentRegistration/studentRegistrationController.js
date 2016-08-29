'use strict';

angular.module("nusPartimeApp").controller("studentRegistrationController", ["$scope", 
	function($scope) {
		$scope.register = function() {
			console.log($scope.matricNumber);
			// suppose to check validity of matric number
			// then register
			
		}
	}]);