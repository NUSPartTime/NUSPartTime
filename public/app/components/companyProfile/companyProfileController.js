"use strict";

angular.module("nusPartimeApp").controller("companyProfileController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "CompanyService",
	function($scope, $location, RegistrationService, AuthService, Session, CompanyService) {
		AuthService.autoLogin().then(function(){
            CompanyService.getAllCompanies(Session.userId).then(function(res){
                $scope.companies = res;
				$(".personalInfo-button").addClass("active");
            });
        });

        $scope.editCompanyProfile = function(company){
            CompanyService.setCompany(company);
            $location.path("/companyProfileEdit");
        }

		$scope.showPersonalInfo = function() {
			$(".companyInfo").addClass("hidden");
			$(".companyInfo-button").removeClass("active");
			$(".personalInfo").removeClass("hidden");
			$(".personalInfo-button").addClass("active");
		}

		$scope.showCompanyInfo = function() {
			$(".companyInfo").removeClass("hidden");
			$(".companyInfo-button").addClass("active");
			$(".personalInfo").addClass("hidden");
			$(".personalInfo-button").removeClass("active");
		}
	}]);
