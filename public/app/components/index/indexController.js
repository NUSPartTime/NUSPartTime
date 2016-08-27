
angular.module("nusPartimeApp").controller("indexController", ["$scope", "$location",
	function($scope, $location) {
		$scope.fbLoginText = "Log Out";

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

						$scope.fbLoginText = "Log In";
						$scope.$apply();
						// $.post('/userManagement/logout', {}).done(function (data, textStatus) {
						// 	if (typeof data.redirect == 'string') {
						// 		window.location = data.redirect;
						// 	}
						// });
					});
				} else {
					FB.login(function(response) {
						if (response.authResponse) {
							console.log("logged in from FB");

							$scope.fbLoginText = "Log Out";
							$scope.$apply();
							// $.post('/userManagement/create_user', {
							// 	id: FB.getAuthResponse().userID,
							// 	name: FB.getAuthResponse().name
							// }).done(function (data, textStatus) {
							// 	if (typeof data.redirect == 'string') {
							// 		window.location = data.redirect;
							// 	}
							// });
						} else {
							//user hit cancel button
							console.log('User cancelled login or did not fully authorize.');
						}
					}, {
						scope: 'public_profile, email'
					});
				}
			});
		}
	}]);