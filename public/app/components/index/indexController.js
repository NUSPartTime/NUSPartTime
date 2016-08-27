
angular.module("nusPartimeApp").controller("indexController", ["$scope", "$location",
	function($scope, $location) {
		var student_registration = function(user_id) {
			console.log("creating student!");
			console.log(user_id);
			$.post('/userManagement/create_student', {
				id: user_id
			}).done(function (data, textStatus) {
				if (typeof data.redirect == 'string') {
					window.location = data.redirect;
				}
			});
		};
		var company_registration = function(user_id) {
			console.log("creating company!");
			$.post('/userManagement/create_company', {
				id: user_id
			}).done(function (data, textStatus) {
				if (typeof data.redirect == 'string') {
					window.location = data.redirect;
				}
			});
		};

		$scope.directStudentPage = function() {
			console.log("direct to student page");
			$location.path("/student");
		}

		$scope.directCompanyPage = function() {
			console.log("direct to company page");
			$location.path("/company");
		}

		$scope.fbToggle = function() {
			console.log("hi");
		}
	}]);