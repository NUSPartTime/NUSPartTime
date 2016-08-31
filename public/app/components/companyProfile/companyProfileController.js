"use strict";

angular.module("nusPartimeApp").controller("companyProfileController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "CompanyService",
	function($scope, $location, RegistrationService, AuthService, Session, CompanyService) {
		AuthService.autoLogin().then(function(){
            CompanyService.getAllCompanies(Session.userId).then(function(res){
                $scope.companies = res;
            });
        });

        $scope.editCompanyProfile = function(company){
            CompanyService.setCompany(company);
            $location.path("/companyProfileEdit");
        }
	}]);
