"use strict";

angular.module("nusPartimeApp").controller("companyProfileController",
	["$scope", "$location", "RegistrationService", "AuthService", "Session", "CompanyService", "UserService",
	function($scope, $location, RegistrationService, AuthService, Session, CompanyService, UserService) {
		AuthService.autoLogin().then(function(){
			$scope.catJobsArray = [];
			$scope.allJobsArray = [];
			$scope.displayedJobs = [];

			CompanyService.getAllCompanies(Session.userId).then(function(res){
                $scope.companies = res;
				$(".personalInfo-button").addClass("active");
				$scope.editStatus = "0";
            });

			CompanyService.getAllJobs(Session.userId).then(function(res){
				$scope.catJobsArray = res;
				for (var catJobs of res) {
					$scope.allJobsArray = $scope.allJobsArray.concat(catJobs.jobs);
				}
				var substringMatcher = function(jobObjects) {
					return function findMatches(q, cb) {

						// an array that will be populated with substring matches
						var labelArray = [];

						// regex used to determine if a string contains the substring `q`
						var substringRegex = new RegExp(q, 'i');

						// iterate through the pool of strings and for any string that
						// contains the substring `q`, add it to the `matches` array
						$.each(jobObjects, function(i, jobObject) {
							if (substringRegex.test(jobObject.title)) {
								var labelObject = {
									value: jobObject.title,
									id: jobObject.id,
									company: jobObject.Company.name
								};
								labelArray.push(labelObject);
							}
						});

						cb(labelArray);
					};
				};

				$(".profile-search").typeahead({
					hint: true,
					highlight: false,
					minLength: 1
				},
				{
					name: "jobs",
					source: substringMatcher($scope.allJobsArray),
					templates: {
						empty: [
							"<div class='panel-without-mb wrapper'>No existing job matches your key word.</div>"
						].join('\n'),
						suggestion: function(data) {
							return "<a class='typeahead-result' href='#/job/" + data.id +  "'>" + data.value + "</a>";
						}
					}
				});
			});

			UserService.getUserProfile(Session.userId).then(function(res){
				$scope.user = res;
			});



        });

        $scope.editCompanyProfile = function(company){
            CompanyService.setCompany(company);
            $location.path("/companyProfileEdit");
        }

		$scope.showPersonalInfo = function() {
			$(".companyInfo").addClass("hidden");
			$(".companyInfo-button").removeClass("active");
			$(".personalInfo").removeClass("hidden");
			$(".personalInfo-button").addClass("active");
		}

		$scope.showCompanyInfo = function() {
			$(".companyInfo").removeClass("hidden");
			$(".companyInfo-button").addClass("active");
			$(".personalInfo").addClass("hidden");
			$(".personalInfo-button").removeClass("active");
		}

		$scope.updateUserProfile = function() {
            UserService.updateUserProfile($scope.user).then(function(res){
                console.log(res);
				$scope.editStatus = "0";
            });

        }

		$scope.editUser = function() {
			$scope.editStatus = "1";
		}

		$scope.cancelEdit = function() {
			$scope.editStatus = "0";
		}
	}]);
