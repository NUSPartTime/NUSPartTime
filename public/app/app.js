'use strict';

var nusPartime = angular.module("nusPartimeApp", [
	"ngRoute"
]);

nusPartime.config(["$routeProvider", "$locationProvider", 
	function($routeProvider, $locationProvider) {
	// function($stateProvider, $urlRouterProvider) {
	// 	$stateProvider.
	// 		state("main", {
	// 			url: "/",
	// 			templateUrl: "/app/components/index/index.jade",
	// 			controller: "indexController"
	// 		});

		$routeProvider.
			when("/", {
				templateUrl: "/app/components/index/index.jade",
				controller: "indexController"
			}).
			when("/student", {
				templateUrl: "/app/components/student/studentMainPage.jade",
				controller: "studentMainController"
			}).
			when("/company", {
				templateUrl: "/app/components/company/companyMainPage",
				controller: "companyMainController"
			}).
			otherwise({
				redirectTo: "/"
			});
	}]);

// nusPartime.run(['$rootScope', '$window',
//   function($rootScope, $window) {

//   $rootScope.user = {};

//   $window.fbAsyncInit = function() {
//     // Executed when the SDK is loaded
//     FB.init({
// 	    appId: '833829723419057',
// 	    xfbml: true,
// 	    cookie: true,
// 	    version: 'v2.7'
// 	});
//   };

//   (function(d, s, id) {
// 	  var js, fjs = d.getElementsByTagName(s)[0];
// 	  if (d.getElementById(id)) {
// 	    return;
// 	  }
// 	  js = d.createElement(s);
// 	  js.id = id;
// 	  js.src = "//connect.facebook.net/en_US/sdk.js";
// 	  fjs.parentNode.insertBefore(js, fjs);
// 	}(document, 'script', 'facebook-jssdk'));
// }]);

// nusPartime.factory('facebookService', function($q) {
//     return {
//         getMyId: function() {
//             var deferred = $q.defer();
//             FB.api('/me', {
//                 fields: 'last_name'
//             }, function(response) {
//                 if (!response || response.error) {
//                     deferred.reject('Error occured');
//                 } else {
//                     deferred.resolve(response);
//                 }
//             });
//             return deferred.promise;
//         }
//     }
// });



