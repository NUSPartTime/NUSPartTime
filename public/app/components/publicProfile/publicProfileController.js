"use strict";

angular.module("nusPartimeApp").controller("publicProfileController",
	["$scope", "UserService", "userId",
	function($scope, UserService, userId) {
		UserService.getUserProfile(userId).then(function(res){
			console.log(res);
            $scope.user = res;
        });
	}]);
