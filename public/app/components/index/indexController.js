'use strict';

angular.module("nusPartimeApp").controller("indexController", ["$scope", "$location", "AuthService", "isAuthenticated",
	function($scope, $location, AuthService, isAuthenticated) {
		if (isAuthenticated) {
			$scope.fbLoginText = "Log Out";
		} else {
			$scope.fbLoginText = "Log In";
		}

		$scope.studentRegistration = function() {
		}

		$scope.companyRegistration = function() {
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
				console.log(response);

				if (response.status === 'connected') {
					FB.logout(function(response) {
						console.log("logged out from FB");
						AuthService.logout();

						$scope.fbLoginText = "Log In";
						$scope.$apply();
					});
				} else {
					FB.login(function(response) {
						if (response.authResponse) {
							console.log("logged in from FB");
							AuthService.login(FB.getAuthResponse().userID).
								then(function(response) {
									$location.path(response);
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