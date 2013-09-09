'use strict';

angular.module('myApp', ['webcam', 'angularSpinner', 'ui.bootstrap', 'angularytics', 'ajoslin.promise-tracker', 'myApp.filters', 'myApp.services', 'myApp.directives']).
	config(['$routeProvider', '$locationProvider', '$httpProvider', 'AngularyticsProvider', function ($routeProvider, $locationProvider, $httpProvider, AngularyticsProvider) {
		AngularyticsProvider.setEventHandlers(['Console', 'Google']);
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$routeProvider
			.when('/', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'})
			.when('/wrong_browser', {templateUrl: 'partials/wrong_browser.html', controller: 'WrongBrowserCtrl'})
			.when('/snapshot', {templateUrl: 'partials/snapshot.html', controller: 'SnapshotCtrl'})
			.when('/add', {templateUrl: 'partials/review.html', controller: 'AddCtrl'})
			.when('/add_response', {templateUrl: 'partials/response.html', controller: 'AddResponseCtrl'})
			.when('/train', {templateUrl: 'partials/response.html', controller: 'TrainCtrl'})
			.when('/new_snapshot', {templateUrl: 'partials/new_snapshot.html', controller: 'NewSnapshotCtrl'})
			.when('/recognize', {templateUrl: 'partials/review.html', controller: 'RecognizeCtrl'})
			.when('/recognize_response', {templateUrl: 'partials/response.html', controller: 'RecognizeResponseCtrl'})
			.otherwise({redirectTo: '/'});

		$locationProvider.html5Mode(true);
	}]).
	run(function(Angularytics, $rootScope) {
		Angularytics.init();
		$rootScope.spinnerOpts = {
			lines: 13, // The number of lines to draw
			length: 20, // The length of each line
			width: 10, // The line thickness
			radius: 30, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000', // #rgb or #rrggbb or array of colors
			speed: 0.8, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: true, // Whether to render a shadow
			hwaccel: true, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 1 // The z-index (defaults to 2000000000)
//			top: '200%', // Top position relative to parent in px
//			left: '600%' // Left position relative to parent in px
		};
	});