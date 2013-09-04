'use strict';

/* Directives */
var app = angular.module('myApp.directives', ['webcam']);

app.directive("prettyPrint", function(){
	return {
		template:
			'<div ng-transclude />',
		restrict: 'E',
		replace: true,
		transclude: true,
		scope:
		{
			data: '&'
		},
		link: function postLink($scope, $element) {
			if ($scope.data()) {
				$element.prettify({highlight : true}, $scope.data());
			} else {
				$element.prettify({highlight : true}, { error: 'no data'});
			}
		}
	};
});

app.directive("webcamCanvas", function ($timeout) {
	return {
		require:['^webcam', '?^ngController'],
		template: '<div class="webcamcanvas" ng-transclude>' +
			'<canvas id="snapshot" ng-hide="true"></canvas>' +
			'</div>',
		restrict: 'E',
		replace: true,
		transclude: true,
		link: function ($scope, $element, $attrs, controllers) {
			var _video = null,
				patOpts = {x: 0, y: 0, w: 25, h: 25},
				$webcam = controllers[0];

			$webcam.onStream = function(opts) {
				$timeout(function(){
					_video = opts.video;

					$scope.$apply(function(){
						patOpts.w = _video.width;
						patOpts.h = _video.height;
					});
				}, 500);
			};

			$(document).on('click', 'button', controllers, function(){
				var patCanvas = document.querySelector('#snapshot');
				if (!patCanvas) return;

				patCanvas.width = _video.width;
				patCanvas.height = _video.height;
				var ctxPat = patCanvas.getContext('2d');
				ctxPat.drawImage(_video, 0, 0, _video.width, _video.height);
				var idata = ctxPat.getImageData(patOpts.x, patOpts.y, patOpts.w, patOpts.h);
				ctxPat.putImageData(idata, 0, 0);

				controllers[1].makeSnapshot(patCanvas);
			})
		}
	}
});