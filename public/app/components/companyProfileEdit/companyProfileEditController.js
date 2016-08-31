"use strict";

angular.module("nusPartimeApp").controller("companyProfileEditController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "CompanyService",
	function($scope, $location, RegistrationService, AuthService, Session, CompanyService) {
		AuthService.autoLogin();

        $scope.currentCompany = CompanyService.getCompany();

        $scope.updateCompanyProfile = function(){
            CompanyService.updateCompanyProfile($scope.currentCompany).then(function(res){
                $location.path("/company");
            });
        }
	}]);
