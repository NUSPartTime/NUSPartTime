"use strict";

angular.module("nusPartimeApp").controller("notificationController",
	["$scope", "$location", "Session", "AuthService", "NotificationService",
	function($scope, $location, Session, AuthService, NotificationService) {

		$scope.notificationArray = [];

		AuthService.autoLogin()
		.then(function(){
			NotificationService.getAllNotifications(Session.userId).then(function(res){
				$scope.notificationArray = res;
			});
		});

		$scope.readNotification = function(index) {
			console.log($scope.notificationArray[index].id);
			NotificationService.readNotification($scope.notificationArray[index].id).then(function(res) {
				if (!res.error) {
					$scope.notificationArray[index].status = res.status;
				} else {
					console.log(res.error);
				}
			});
		}
	}]);
