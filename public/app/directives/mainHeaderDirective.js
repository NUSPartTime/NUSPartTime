"use strict";

angular.module("nusPartimeApp").directive("mainHeader", function() {
    return {
        restirct: "AE",
        templateUrl: "/app/directives/mainHeader.html",
        controller: ["$scope", "$location", function($scope, $location) {
            $scope.dirctHomePage = function() {
                $location.path("/");
            }
        }]
    }
});