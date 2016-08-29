"use strict";

angular.module("nusPartimeApp").directive("studentHeader", function() {
    return {
        restirct: "AE",
        scope: {user: "="},
        templateUrl: "/app/directives/studentHeader.html",
        controller: ["$scope", "$location", "Session", "AuthService", function($scope, $location, Session, AuthService) {
            $scope.user = {};
            AuthService.autoLogin().then(function() {
                if (!Session.isStudent) {
                    $location.path("/studentRegister");
                }
                $scope.user.userId = Session.userId;
            });

            $scope.directStudentPage = function() {
                $location.path("/student");
            }

            $scope.dirctHomePage = function() {
                $location.path("/");
            }
        }]
    }
});