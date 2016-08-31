"use strict";

angular.module("nusPartimeApp").controller("jobCreationController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "JobService",
	function($scope, $location, RegistrationService, AuthService, Session, JobService) {
		AuthService.autoLogin()
        .then(function(){
            JobService.getJobApplicationForm(Session.userId).then(function(res){
                $scope.categories = res.categories;
                $scope.companies = res.companies;
				$(function() {
			        $('.datepicker').datepicker();
			    });
            });
        });

        $scope.create = function(){
			console.log($scope.status);
            var postParam = {
                userId: Session.userId,
                companyId: $scope.companyId,
                title: $scope.title,
                status: "0",
                salary: $scope.salary,
                description: $scope.description,
                applicationDeadline: $scope.applicationDeadline,
                deadline: $scope.deadline,
                categoryId: $scope.categoryId
            };

            JobService.createJob(postParam).then(function(res){
                $location.path("/company");
            });
        };

		// $scope.register = function() {
		// 	/*
		// 		stub
		// 	*/
		// 	// then register
		// 	RegistrationService.registerCompany(Session.userId, $scope.name, $scope.contact, $scope.email);
		// };
	}]);
