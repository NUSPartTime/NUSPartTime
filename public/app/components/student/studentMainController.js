"use strict";

angular.module("nusPartimeApp").controller("studentMainController",
	["$scope", "$location", "Session", "AuthService", "JobService",
	function($scope, $location, Session, AuthService, JobService) {
		$scope.catJobsArray = [];
		$scope.allJobsArray = [];
		$scope.displayedJobs = [];

		AuthService.autoLogin().then(function(res) {
			if (!!res && res.isRegistered && !Session.isStudent) {
				$location.path("/studentRegister");
			} else {
				JobService.getAllJobs().then(function(res) {
					$scope.catJobsArray = res;
					for (var catJobs of res) {
						$scope.allJobsArray = $scope.allJobsArray.concat(catJobs.jobs);
					}
					$scope.showAllContent();

					$(".all-jobs-button").addClass("active");

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
			}
		});

		$scope.showAllContent = function() {
			$scope.displayedJobs = $scope.allJobsArray;
		}

		$scope.showContent = function(index) {
			$scope.displayedJobs = $scope.catJobsArray[index].jobs;
		}
	}]);
