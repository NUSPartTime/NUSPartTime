'use strict';

var nusPartime = angular.module("nusPartimeApp", [
	"ngRoute"
]);
//$stateProvider, $urlRouterProvider, 
nusPartime.config(function($routeProvider) {

		$routeProvider.when('/', {
			templateUrl: "index",
			controller: "IndexCtrl"
		});
		// $stateProvider.
		//     state('main', {
		//     	url: '/',
		// 		templateUrl: 'index',
		// 		controller: 'indexController'
		//     }).
		//     state('studentMainPage', {
		//     	url: '/student',
		// 		templateUrl: 'studentMainPage',
		// 		controller: 'studentController'
		//     }).
		//     state('companyMainPage', {
		//     	url: '/company',
		// 		templateUrl: 'companyMainPage',
		// 		controller: 'companyController'
		//     });

		// $urlRouterProvider.otherwise("/");
		// $locationProvider.html5Mode(true);
	});

nusPartime.controller("IndexCtrl", ["$scope", function($scope) {

}]);
