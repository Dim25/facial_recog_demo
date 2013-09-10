'use strict';

/* Filters */

angular.module('myApp.filters', []).
	filter('toTitleCase', function () {
		return function (text) {
			return text.replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
	}).
	filter('toName', function () {
		return function (text) {
			return text.replace('_', ' ').replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
	});