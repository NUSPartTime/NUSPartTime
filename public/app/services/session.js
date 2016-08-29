"use strict";

angular.module("nusPartimeApp").service("Session", function () {
	this.create = function (userId, isStudent, isEmployer) {
		this.userId = userId;
		this.isStudent = isStudent;
		this.isEmployer = isEmployer
	};
	this.destroy = function () {
		this.userId = null;
		this.isStudent = null;
		this.isEmployer = null;
	};
})