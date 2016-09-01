"use strict";

angular.module("nusPartimeApp").controller("companyMainController",
	["$scope", "$location", "Session", "AuthService", "CompanyService", "JobService",
	function($scope, $location, Session, AuthService, CompanyService, JobService) {

		$scope.catJobsArray = [];
		$scope.allJobsArray = [];
		$scope.displayedJobs = [];

		AuthService.autoLogin().then(function(res) {
			if (res.isRegistered && !Session.isEmployer) {
				// direct to company registration
				$location.path("/companyRegister");
			}
		}).then(function(){
			CompanyService.getAllJobs(Session.userId).then(function(res){
				$scope.catJobsArray = res;
				for (var catJobs of res) {
					$scope.allJobsArray = $scope.allJobsArray.concat(catJobs.jobs);
				}

				$scope.showAllContent();
				$(".all-company-button").addClass("active");

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
									id: jobObject.id,
									company: jobObject.Company.name
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
		});

		$scope.reload = function() {
			location.reload();
		}

		// Converts status number to open or closed
		$scope.convertStatus = function(statusNumber) {
			return statusNumber == "0" ? "Open" : "Closed";
		}

		$scope.showAllContent = function($event) {
			if($event !== undefined) {
				$(".nav-side-bar li").removeClass('active');
				$($event.target).parent().addClass('active');
			}
			$scope.displayedJobs = $scope.allJobsArray;
		}

		$scope.showContent = function(index, $event) {
			$(".nav-side-bar li").removeClass('active');
			$($event.target).parent().addClass('active');
			$scope.displayedJobs = $scope.catJobsArray[index].jobs;
		}

		$scope.editJob = function(job){
			JobService.setJob(job);
			// should return to job view
			$location.path("/jobEdit");
		}

	}]);
