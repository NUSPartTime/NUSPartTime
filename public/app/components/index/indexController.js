"use strict";

angular.module("nusPartimeApp").controller("indexController", 
	["$scope", "$location", "AuthService", "RegistrationService", "isAuthenticated",
	function($scope, $location, AuthService, RegistrationService, isAuthenticated) {
		$scope.showLogin = false;
		if (isAuthenticated) {
			$scope.fbLoginText = "Log Out";
			// check if need to redirect
			AuthService.autoLogin().then(function(response) {
				if (response.needRedirect) {
					$location.path(response.redirectUrl);
				} else {
					$scope.showLogin = true;
				}
			});
		} else {
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
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					FB.logout(function(response) {
						console.log("logged out from FB");
						AuthService.logout(true);

						$scope.showLogin = false;
						$scope.fbLoginText = "Log In";
						$scope.$apply();
					});
				} else {
					FB.login(function(fbResponse) {
						if (fbResponse.authResponse) {
							console.log("logged in from FB");
							AuthService.login(FB.getAuthResponse().userID).
								then(function(authenticationResponse) {
									if (!authenticationResponse.isRegistered) {
										// user doesn't exist, create new user
										FB.api("/me", function(res) {
											RegistrationService.registerUser(
												res.id,
												res.name
											).then(function(registerUserResponse) {
												if (registerUserResponse.status == "success"){
													AuthService.login(res.id);
													$scope.showLogin = true;
												} else {
													console.log(registerUserResponse.error);
												}
											});
										});
									} else {
										if (authenticationResponse.needRedirect) {
											$location.path(authenticationResponse.redirectUrl);
										} else {
											// registered user but neither student or employer
											$scope.showLogin = true;
										}
									}
								});

							$scope.fbLoginText = "Log Out";
							$scope.$apply();
						} else {
							//user hit cancel button
							console.log('User cancelled login or did not fully authorize.');
						}
					});
				}
			});
		}
	}]);