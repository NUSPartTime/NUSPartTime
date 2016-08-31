"use strict"

angular.module("nusPartimeApp").factory("NotificationService", function($http, $location, Session) {
    var notificationService = {};

    notificationService.getAllNotifications = function(userId){
        var postParam = {
            userId: userId
        };
        return $http.post("/notificationManagement/allNotifications", postParam).then(function(res){
            return JSON.parse(res.data.notificationArray);
        });
    }

    notificationService.readNotification = function(notificationId) {
    	console.log(notificationId);
		var postParam = {
			notificationId: notificationId
		};
		return $http.post("/notificationManagement/readNotification", postParam).then(function(res) {
			return res.data;
		});		
	}

    return notificationService;
});
