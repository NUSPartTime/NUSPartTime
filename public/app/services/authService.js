'use strict';

angular.module("nusPartimeApp").factory("AuthService", function ($http, $cookies, Session) {
	var authService = {};

	authService.login = function (userId) {
		var postParam = {userId: userId};
		return $http
			.post("/userManagement/login", postParam)
			.then(function (res) {
				console.log("AuthService Log in response from server: ");
				console.log(res.data);
				if (res.data.error != undefined) {

				} else {
					$cookies.put("userId", userId);
					Session.create(userId, res.data.isStudent,
					               res.data.isEmployer);
					return res.data.redirect;
				}
			});
	};

	authService.isAuthenticated = function () {
		return (!!Session.userId || !!$cookies.get("userId"));
	};

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