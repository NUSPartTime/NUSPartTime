"use strict";

var nusPartime = angular.module("nusPartimeApp", [
	"ngRoute", "ngCookies"
]);

nusPartime.config(["$routeProvider", "$locationProvider", 
	function($routeProvider, $locationProvider) {
		$routeProvider.
			when("/", {
				templateUrl: "/app/components/index/index.html",
				controller: "indexController",
				resolve: {
					isAuthenticated: function(AuthService) {
						return AuthService.isAuthenticated();
					}
				}
			}).
			when("/student", {
				templateUrl: "/app/components/student/studentMainPage.html",
				controller: "studentMainController"
			}).
			when("/company", {
				templateUrl: "/app/components/company/companyMainPage.html",
				controller: "companyMainController"
			}).
			when("/studentRegister", {
				templateUrl: "/app/components/studentRegistration/studentRegistrationPage.html",
				controller: "studentRegistrationController"
			}).
			otherwise({
				redirectTo: "/"
			});
	}]);

nusPartime.constant("AUTH_EVENTS", {
	loginSuccess: "auth-login-success",
	loginFailed: "auth-login-failed",
	logoutSuccess: "auth-logout-success",
	sessionTimeout: "auth-session-timeout",
	notAuthenticated: "auth-not-authenticated",
	notAuthorized: "auth-not-authorized"
});

nusPartime.constant("USER_ROLES", {
	all: "*",
	admin: "admin",
	student: "student",
	employer: "employer",
	guest: "guest"
})

nusPartime.run(["$rootScope", "$window", "$location", "AuthService", 
	function($rootScope, $window, $location, AuthService) {
		$rootScope.user = {};
		$window.fbAsyncInit = function() {
			// Executed when the SDK is loaded
			FB.init({
				appId: "833829723419057",
				xfbml: true,
				cookie: true,
				version: "v2.7"
			});

			FB.getLoginStatus(function(response){
				// if logged into Facebook
				if (response.status === 'connected') {
					var userID = FB.getAuthResponse().userID;
					var loginStatus = AuthService.isAuthenticated();
					if (!loginStatus) {
						AuthService.login(userID).then(function(param) {
							// redirect if needed
							$location.path(param);
						});
					}
				}
			});
		};

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, "script", "facebook-jssdk"));
	}]);

// nusPartime.factory("FacebookService", ["$q", 
// 	function($q) {
// 		return {
// 			isLoggedIn: function() {
// 				var deferred = $q.defer();
// 				FB.getLoginStatus(function(response) {
// 					console.log(response);
// 					if (response.status === "connected") {
// 						deferred.resolve("true");	
// 					} else {
// 						deferred.resolve("false");	
// 					}
// 				});
// 				return deferred.promise;
// 			}
// 		}
// 	}]);