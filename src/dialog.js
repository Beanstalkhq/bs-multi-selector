var template = require('./multi-selector.html');
require('./multi-selector.css');

angular.module('cp-multi-selector')
	.directive('cpMultiSelectorDialog', function() {
		return {
			restrict: "E",
			transclude: true,
			template: template,
			link: function(scope, el, attr) {
			}
		}
	});
