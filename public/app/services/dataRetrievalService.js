"use strict";

angular.module("nusPartimeApp").factory("DataRetrievalService", 
	function ($http) {
		var dataRetrievalService = {};

		// return an array of categories, each containing an array of jobs
		dataRetrievalService.getAllJobs = function() {
			return $http.get("/jobManagement/allJobs").then(function(res) {
						return JSON.parse(res.data.catJobArray);
					});
		};

		dataRetrievalService.getJob = function(jobId, userId) {
			return $http.get("/jobManagement/getJob/" + jobId + "/user/" + userId).then(function(res) {
						return res.data;
					})
		}

		return dataRetrievalService
	});