"use strict";

angular.module("nusPartimeApp").controller("indexController",
	["$scope", "$location", "Session", "AuthService", "RegistrationService", "isAuthenticated",
	function($scope, $location, Session, AuthService, RegistrationService, isAuthenticated) {
		$scope.isStudent = false;
		$scope.isEmployer = false;
		$scope.showLogin = true;
		$scope.fbLoginText = "Log Out";
		if (isAuthenticated) {
			$scope.fbLoginText = "Log Out";
			// check if need to redirect
			AuthService.autoLogin().then(function(response) {
				// if (response.needRedirect) {
				// 	$location.path(response.redirectUrl);
				// } else {
					$scope.isStudent = response.isStudent;
					$scope.isEmployer = response.isEmployer;
					$scope.showLogin = true;
				// }
			});
		} else {
			$scope.showLogin = false;
			$scope.fbLoginText = "Log In";
		}

		$scope.studentRegistration = function() {
			$location.path("/studentRegister");
		}

		$scope.companyRegistration = function() {
			$location.path("/companyRegister");
		}

		$scope.directStudentPage = function() {
			console.log("direct to student page");
			$location.path("/student");
		}

		$scope.directCompanyPage = function() {
			console.log("direct to company page");
			$location.path("/company");
		}

		$scope.fbToggle = function() {
			if (AuthService.isAuthenticated() && !!Session.userId) {
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						FB.logout(function(response) {
							console.log("logged out from FB");
						});
					}
					AuthService.logout(true);
					$scope.showLogin = false;
					$scope.fbLoginText = "Log In";
				});
			} else {
				FB.getLoginStatus(function(response) {
					if (response.status !== 'connected') {
						FB.login(function(fbResponse) {
							if (fbResponse.authResponse) {
								console.log("logged in from FB");
								var userID = fbResponse.authResponse.userID;
								AuthService.login(userID).
									then(function(authenticationResponse) {
										if (!authenticationResponse.isRegistered) {
											// user doesn't exist, create new user
											FB.api("/me", function(res) {
												RegistrationService.registerUser(userID,res.name)
													.then(function(registerUserResponse) {
													if (registerUserResponse.status == "success"){
														AuthService.login(userID).then(function(loginRes) {
															console.log("New registered user logged in.");
															location.reload();
														});
													} else {
														console.log(registerUserResponse.error);
													}
												});
											});
										} else {
											// if (authenticationResponse.needRedirect) {
												// $location.path(authenticationResponse.redirectUrl);
											// } else {
												// registered user but neither student or employer
												$scope.isStudent = authenticationResponse.isStudent;
												$scope.isEmployer = authenticationResponse.isEmployer;
												$scope.showLogin = true;
												$scope.fbLoginText = "Log Out";
												// $scope.$apply();
											// }
										}
										swal("Logged In", "Welcome to NUS PARTIME!", "success");
									});
							} else {
								//user hit cancel button
								console.log('User cancelled login or did not fully authorize.');
							}
						});
					}
				});
			}
		}
	}]);
