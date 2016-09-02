"use strict";

angular.module("nusPartimeApp").controller("studentMainController",
	["$scope", "$location", "Session", "AuthService", "JobService",
	function($scope, $location, Session, AuthService, JobService) {
		$scope.catJobsArray = [];
		$scope.allJobsArray = [];
		$scope.displayedJobs = [];
		$scope.pageJobs = [];
		$scope.pageLimit = 5;
		$scope.currentIndex = 0;

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

		$scope.showAllContent = function($event) {
			//console.log("showAllContent");
			if($event !== undefined) {
				$(".nav-side-bar li").removeClass('active');
				$($event.target).parent().addClass('active');
			}
			$scope.displayedJobs = $scope.allJobsArray;
			$scope.showPageContent();
		}

		$scope.showContent = function(index, $event) {
			//console.log("showContent");
			$scope.currentIndex = 0;
			$(".nav-side-bar li").removeClass('active');
			$($event.target).parent().addClass('active');
			$scope.displayedJobs = $scope.catJobsArray[index].jobs;
			$scope.showPageContent();
		}

		$scope.showPageContent = function() {
			//console.log("showPageContent");
			$scope.pageJobs = $scope.displayedJobs.slice($scope.currentIndex, $scope.currentIndex+$scope.pageLimit);
		}

		$scope.pageUp = function() {
			$scope.currentIndex += $scope.pageLimit;
			if ($scope.currentIndex >= $scope.displayedJobs.length) {
				$scope.currentIndex = 0;
			}
			//console.log($scope.currentIndex);
			$scope.showPageContent();
		}

		$scope.pageDown = function() {
			$scope.currentIndex -= $scope.pageLimit;
			if ($scope.currentIndex < 0) {
				if (($scope.displayedJobs.length % $scope.pageLimit) == 0) {
					$scope.currentIndex = $scope.displayedJobs.length - $scope.pageLimit;
				} else {
					$scope.currentIndex = $scope.displayedJobs.length - ($scope.displayedJobs.length % $scope.pageLimit);
				}
			}
			//console.log($scope.currentIndex);
			$scope.showPageContent();
		}
	}]);
