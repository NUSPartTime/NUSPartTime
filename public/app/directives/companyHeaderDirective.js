"use strict";

angular.module("nusPartimeApp").directive("companyHeader", function() {
    return {
        restirct: "AE",
        scope: {user: "="},
        templateUrl: "/app/directives/companyHeader.html",
        controller: ["$scope", "$location", "Session", "AuthService", function($scope, $location, Session, AuthService) {
            $scope.user = {};
            AuthService.autoLogin().then(function() {
                if (!Session.isEmployer) {
                    $location.path("/companyRegister");
                }
                $scope.user.userId = Session.userId;
            });

            $scope.logout = function() {
                AuthService.logout(false);
            }
        }]
    }
});