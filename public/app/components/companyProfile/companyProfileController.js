"use strict";

angular.module("nusPartimeApp").controller("companyProfileController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "CompanyService", "UserService",
	function($scope, $location, RegistrationService, AuthService, Session, CompanyService, UserService) {
		AuthService.autoLogin().then(function(){
            CompanyService.getAllCompanies(Session.userId).then(function(res){
                $scope.companies = res;
				$(".personalInfo-button").addClass("active");
				$scope.editStatus = "0";

            });

			UserService.getUserProfile(Session.userId).then(function(res){
				$scope.user = res;
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

		$scope.editUser = function() {
			$scope.editStatus = "1";
		}

		$scope.cancelEdit = function() {
			$scope.editStatus = "0";
		}
	}]);
