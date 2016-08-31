"use strict";

angular.module("nusPartimeApp").controller("companyProfileController",
	["$scope", "RegistrationService", "AuthService", "Session", "CompanyService",
	function($scope, RegistrationService, AuthService, Session, CompanyService) {
		AuthService.autoLogin().then(function(){
            CompanyService.getAllCompanies(Session.userId).then(function(res){
                $scope.companies = res;
            });
        });

	}]);
