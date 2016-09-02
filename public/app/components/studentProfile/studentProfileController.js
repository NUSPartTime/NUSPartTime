"use strict";

angular.module("nusPartimeApp").controller("studentProfileController",
	["$scope", "$location",  "AuthService", "Session", "UserService", "JobService",
	function($scope, $location, AuthService, Session, UserService, JobService) {
		$scope.catJobsArray = [];
		$scope.allJobsArray = [];
		$scope.displayedJobs = [];
        $scope.editStatus = "0";
		AuthService.autoLogin().then(function(){
            $scope.jobArray = [];

            JobService.getUserJobs(Session.userId).then(function(res){
                $scope.jobArray = res;
                console.log($scope.jobArray);
            });

			JobService.getAllJobs().then(function(res) {
				console.log(res);
				$scope.catJobsArray = res;
				for (var catJobs of res) {
					$scope.allJobsArray = $scope.allJobsArray.concat(catJobs.jobs);
				}
				// for search
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
									id: jobObject.id
								};
								labelArray.push(labelObject);
							}
						});

						cb(labelArray);
					};
				};

				$(".typeahead").typeahead({
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
				$(".company-profile").fadeIn(500);
				$(".personalInfo-button").addClass("active");
            });
        });

        $scope.editUser = function() {
            $scope.editStatus = "1";
        }

        $scope.updateUserProfile = function() {
            UserService.updateUserProfile($scope.user).then(function(res){
                swal("Success", "Personal profile updated!", "success");
            });
			$scope.editStatus = "0";
        }

        $scope.cancelEdit = function() {
            $scope.editStatus = "0";
        }

		$scope.showPersonalInfo = function() {
			$(".personalInfo-button").addClass("active");
			$(".jobInfo-button").removeClass("active");
			$(".personalInfo").removeClass("hidden");
			$(".jobInfo").addClass("hidden");
		}

		$scope.showJobInfo = function() {
			$(".personalInfo-button").removeClass("active");
			$(".jobInfo-button").addClass("active");
			$(".personalInfo").addClass("hidden");
			$(".jobInfo").removeClass("hidden");
		}
	}]);
