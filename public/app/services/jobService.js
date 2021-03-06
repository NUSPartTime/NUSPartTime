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

		jobService.getUserJobs = function(userId) {
			var postParam = {
				userId: userId
			};
			return $http.post("/jobManagement/getUserJobs", postParam).then(function(res) {
						return JSON.parse(res.data.jobArray);
					})
		}

		jobService.getJob = function(jobId, userId) {
			var postParam = {
				jobId: jobId,
				userId: userId
			};
			return $http.post("/jobManagement/getJob", postParam).then(function(res) {
						if (res.data.status !== "success") {
							return {
								error: error
							};
						} else {
							console.log(res.data);
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
						return res.data;
					});
		}

		jobService.cancelJob = function(jobId, userId) {
			var postParam = {
				jobId: jobId,
				userId: userId
			};
			return $http.post("/jobManagement/cancelJob", postParam).then(function(res) {
						return res.data;
					});
		}

		jobService.reapplyJob = function(jobId, userId) {
			var postParam = {
				jobId: jobId,
				userId: userId
			};
			return $http.post("/jobManagement/reapplyJob", postParam).then(function(res) {
						return res.data;
					});
		}

		jobService.getJobApplicationForm = function(userId){
			var postParam = {
				userId: userId
			};
			return $http.post("/jobManagement/getJobApplicationForm", postParam).then(function(res){
				return res.data;
			});
		}

		jobService.createJob = function(postParam){
			return $http.post("/jobManagement/createJob", postParam).then(function(res){
				return res.data;
			});
		}

		jobService.currentJob = {};
		jobService.setJob = function(job){
			jobService.currentJob = job;
		}

		jobService.getCurrentJob = function(){
			return jobService.currentJob;
		}

		jobService.updateJob = function(postParam){
			console.log(postParam);
			return $http.post("/jobManagement/updateJob", postParam).then(function(res){
				return res.data;
			});
		}

		return jobService;
	});
