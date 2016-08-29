'use strict';

angular.module("nusPartimeApp").directive("studentHeader", function() {
    return {
        restirct: "A",
        scope: {user: "="},
        templateUrl: "/app/directives/studentHeader.html",
        controller: ["$scope", "$location", "Session", "AuthService", function($scope, $location, Session, AuthService) {
            $scope.user = {};
            if (AuthService.isAuthenticated()) {
                if (!Session.userId) {
                    // login using cookie
                    AuthService.autoLogin().then(function(res) {
                        if (!Session.isStudent) {
                            $location.path("/");
                        } else {
                            $scope.user.userId = Session.userId;
                        }
                    });
                } else {
                    $scope.user.userId = Session.userId;
                }
            }
        }]
    }
});