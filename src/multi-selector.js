var _ = require('lodash');

var template = require('./multi-selector.html');
var defaultItemTemplate = require('./default-item-template.html');
require('./multi-selector.css');

angular.module('bs-multi-selector')
	.directive('bsMultiSelector', function($sce, $timeout) {
		return {
			restrict: "E",

			scope: {
				source: '=',
				selectedItems: '=',
				template: "=",
				placeholder: '@'
			},

			template: template,

			link: function(scope, el, attr) {
				var id = _.uniqueId(); // This is a unique id associated with this component instance and used to namespace dom events.

				scope.showDialog = false;
				scope.highlightedIndex = null;

				/**
				 * Display the dialog. This is called when the main input is focused or clicked.
				 */
				scope.displayDialog = function() {
					scope.showDialog = true;
					// At the end of a timeout focus the input inside the dialog
					setTimeout(function() {
						el.find('.bs-multi-selector__dialog__input').focus();
					}, 100);

					positionDialog();
				}

				/**
				 * Update the main item template with on provided by the API or a default one.
				 */
				scope.$watch('template', function(value) {
					scope.itemTemplate = value || defaultItemTemplate;
				});

				/**
				 * Reset the highlighted index to null when the user inputs text.
				 */
				scope.$watch('userInput', function() {
					scope.highlightedIndex = null;
				});

				/**
				 * Toggle an item as selected. Also position the dialog accordingly because as we add and remove
				 * items the size of the primary input may change.
				 */
				scope.selectItem = function(item) {
					if(_.find(scope.selectedItems, item)) {
						scope.removeItem(item);
					} else {
						if(!scope.selectedItems) {
							scope.selectedItems = [item];
						} else {
							scope.selectedItems.push(item);
						}
					}
					positionDialog();
				}

				scope.removeItem = function(item) {
					scope.selectedItems = _.without(scope.selectedItems, item);
				}

				scope.isSelected = function(item) {
					return !!_.find(scope.selectedItems, item);
				}

				/**
				 * Keybord navigation logic
				 */
				scope.keyDown = function(e) {
					var keycode = e.which;
					if(keycode === 40) { // press down key
						if(_.isNull(scope.highlightedIndex)) {
							scope.highlightedIndex = 0;
						} else {
							if(scope.highlightedIndex < scope.filteredItems.length - 1) {
								scope.highlightedIndex = scope.highlightedIndex + 1;
							}
						}
					} else if(keycode === 38) { // press up key
						if(!scope.highlightedIndex) {
							scope.highlightedIndex = 0;
						} else {
							if(scope.highlightedIndex > 0) {
								scope.highlightedIndex = scope.highlightedIndex - 1;
							}
						}
					} else if(keycode === 13) { // press enter key
						if(!_.isNull(scope.highlightedIndex)) {
							scope.selectItem(scope.filteredItems[scope.highlightedIndex]);
						}
					}
				}

				/**
				 * We need to manually position the dialog because the size of the input may
				 * grow vertically based upon the quantity of pills within it.
				 */
				function positionDialog() {
					setTimeout(function() {
						var height = el.height();
						el.find('.bs-multi-selector__dialog').css(
							{
								top: height + 1 + 'px'
							}
						);
					},100);
				}

				/**
				 * Setup jquery event listener on the body to know when to close the dialog.
				 * This event is name spaced so that we can correctly clean it up.
				 */
				$('body').on('click.bsmultiselector' + id, function(e) {
					if(!$(e.target).closest(el).length) {
						scope.$apply(function() {
							scope.showDialog = false;
						})
					}
				});

				/** When the directive is removed, cleanup jquery events  **/
				scope.$on('$destroy', function() {
					$('body').off('click.bsmultiselector' + id);
				});
			}
		}
	});


/**
 * This directive represents each "item" within the dropdown select list. It takes a template
 * which defines its inner content. The template will be compiled with the parent scope.
 *
 * This allows the user to define a custom template. By default a template for selecting
 * "people" is included.
 */
angular.module('bs-multi-selector')
	.directive('bsMultiSelectorItem', function($compile) {
		return {
			restrict: "E",

			scope: {
				template: "="
			},

			link: function(scope, el, attr) {
				var childEl;
				scope.$watch('template', function(template) {
					if(template) {
						if(childEl) childEl.remove();
						childEl = $compile(scope.template)(scope.$parent);
						el.append(childEl);
					}
				});
			}
		}
	});
