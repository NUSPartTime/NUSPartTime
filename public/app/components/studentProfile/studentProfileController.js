"use strict";

angular.module("nusPartimeApp").controller("studentProfileController",
	["$scope", "$location",  "AuthService", "Session", "UserService", "JobService",
	function($scope, $location, AuthService, Session, UserService, JobService) {
		AuthService.autoLogin().then(function(){
            $scope.jobArray = [];

            JobService.getUserJobs(Session.userId).then(function(res){
                $scope.jobArray = res;
                
                console.log($scope.jobArray);
            });

            UserService.getUserProfile(Session.userId).then(function(res){
                $scope.user = res;
            });
        });

        $scope.editUser = function() {
            $scope.editStatus = "1";
            console.log($scope.editStatus);
        }

        $scope.updateUserProfile = function() {
            console.log("update user profile");
        }

        $scope.cancelEdit = function() {
            $scope.editStatus = "0";
            console.log($scope.editStatus);
        }
	}]);
