"use strict";

angular.module("nusPartimeApp").factory("AuthService", function ($http, $location, $cookies, Session, $route, $q) {
	var authService = {};

	authService.login = function(userId) {
		var postParam = {userId: userId};
		return $http.post("/userManagement/login", postParam)
					.then(function(res) {
						if (res.data.error != undefined) {
							// FB may not been loaded yet
							if (typeof FB !== "undefined") {
								FB.logout();
							}
							// session might have expired
							authService.logout();
							$location.path("/");
							return {
								error: res.data.error,
								isRegistered: res.data.isRegistered
							}
						} else {
							$cookies.put("userId", userId);
							Session.create(userId, res.data.isStudent,
											res.data.isEmployer);
							return {
								redirectUrl: res.data.redirect,
								isRegistered: res.data.isRegistered,
								isStudent: res.data.isStudent,
								isEmployer: res.data.isEmployer,
								needRedirect: (res.data.isStudent || res.data.isEmployer)
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
			return $q.resolve();
		}
	}

	authService.logout = function(isFBLoggedOut) {
		Session.destroy();
		$cookies.remove("userId");
		if (!isFBLoggedOut) {
			FB.logout(function(response) {
	            $route.reload();
			});
		}
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