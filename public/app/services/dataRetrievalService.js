"use strict";

angular.module("nusPartimeApp").factory("DataRetrievalService", 
	function ($http) {
		var dataRetrievalService = {};

		// return an array of categories, each containing an array of jobs
		dataRetrievalService.getAllJobs = function() {
			return $http.get("/jobs/allJobs").then(function(res) {
						return JSON.parse(res.data.catJobArray);
					});
		};

		dataRetrievalService.getJob = function(id) {
			var param = {
				jobId: id,

			}
			return $http.get("/jobs/getJob", ).then(function(res) {
						return res.data;
					})
		}

		return dataRetrievalService
	});