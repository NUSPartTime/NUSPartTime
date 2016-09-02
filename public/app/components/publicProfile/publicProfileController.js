"use strict";

angular.module("nusPartimeApp").controller("publicProfileController",
	["$scope", "$location",  "AuthService", "Session", "UserService",
	function($scope, $location, AuthService, Session, UserService) {
		AuthService.autoLogin().then(function(){
            UserService.getUserProfile().then(function(res){
                $scope.user = res;
				$(".company-profile").fadeIn(500);
				$(".personalInfo-button").addClass("active");
            });
        });
	}]);
