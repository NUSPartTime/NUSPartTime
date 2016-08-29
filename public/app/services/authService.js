'use strict';

angular.module("nusPartimeApp").factory("AuthService", function ($http, $location, $cookies, Session) {
	var authService = {};

	authService.login = function(userId) {
		var postParam = {userId: userId};
		return $http.post("/userManagement/login", postParam)
					.then(function(res) {
						console.log("AuthService Login response from server: ");
						console.log(res.data);
						if (res.data.error != undefined) {

						} else {
							$cookies.put("userId", userId);
							Session.create(userId, res.data.isStudent,
											res.data.isEmployer);
							return {
								redirectUrl: res.data.redirect,
								isRegistered: (res.data.isStudent || res.data.isEmployer)
							};
						}
					});
	};

	authService.isAuthenticated = function() {
		return (!!Session.userId || !!$cookies.get("userId"));
	};

	// login using info stored in session/cookie, redirect to main page otherwise 
	authService.autoLogin = function() {
		if (authService.isAuthenticated()) {
			return authService.login($cookies.get("userId"));
		} else {
			$location.path("/");
		}
	}

	authService.logout = function() {
		Session.destroy();
		$cookies.remove("userId");
	}

//   authService.isAuthorized = function (authorizedRoles) {
//     if (!angular.isArray(authorizedRoles)) {
//       authorizedRoles = [authorizedRoles];
//     }
//     return (authService.isAuthenticated() &&
//       authorizedRoles.indexOf(Session.userRole) !== -1);
//   };
 
	return authService;
});