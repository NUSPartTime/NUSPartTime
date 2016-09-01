"use strict";

angular.module("nusPartimeApp").factory("UserService", function($http, $location, Session){
    var userService = {};

    userService.updateUserProfile = function(postParam){
        return $http.post("/userManagement/updateUserProfile",postParam).then(function(res){
            return res.data;
        });
    };

    userService.getUserProfile = function(id){
        var postParam = {
            id: id
        }

        return $http.post("/userManagement/getUserProfile", postParam).then(function(res){
            return res.data;
        });
    };

    return userService;
});
