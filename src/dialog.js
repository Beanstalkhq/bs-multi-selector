var template = require('./multi-selector.html');
require('./multi-selector.css');

angular.module('bs-multi-selector')
	.directive('bsMultiSelectorDialog', function() {
		return {
			restrict: "E",
			transclude: true,
			template: template,
			link: function(scope, el, attr) {
			}
		}
	});
