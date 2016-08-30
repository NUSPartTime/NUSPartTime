"use strict";

angular.module("nusPartimeApp").factory("JobService", 
	function ($http) {
		var jobService = {};

		// return an array of categories, each containing an array of jobs
		jobService.getAllJobs = function() {
			return $http.get("/jobManagement/allJobs").then(function(res) {
						return JSON.parse(res.data.catJobArray);
					});
		}

		jobService.getJob = function(jobId, userId) {
			return $http.get("/jobManagement/getJob/" + jobId + "/user/" + userId).then(function(res) {
						if (res.data.status == "error") {
							return {error: "Job ID not found!"}
						} else {
							return res.data;
						}
					})
		}

		jobService.applyJob = function(jobId, userId) {
			var postParam = {
				jobId: jobId,
				userId: userId
			};
			return $http.post("/jobManagement/applyJob", postParam).then(function(res) {
				console.log(res.data);
			});
		}

		return jobService;
	});