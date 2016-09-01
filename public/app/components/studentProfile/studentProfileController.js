"use strict";

angular.module("nusPartimeApp").controller("userProfileController",
	["$scope", "$location",  "AuthService", "Session", "UserService",
	function($scope, $location, AuthService, Session, UserService) {
		AuthService.autoLogin().then(function(){
            UserService.getUserProfile(Session.userId).then(function(res){
                $scope.user = res;
            });
        });

        $scope.updateUserProfile = function(){
            UserService.updateUserProfile($scope.user).then(function(res){
                $location.path("/");
            });
        };


	}]);
