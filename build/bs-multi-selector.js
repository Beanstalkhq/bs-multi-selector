/*!
 * bs-multi-selector
 * author: Bret Little
 * copyright: 2015
 * license: MIT
 * version: 1.0.0
 */
/******/
(function (modules) {
  // webpackBootstrap
  /******/
  // The module cache
  /******/
  var installedModules = {};
  /******/
  /******/
  // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/
    /******/
    // Check if module is in cache
    /******/
    if (installedModules[moduleId])
      /******/
      return installedModules[moduleId].exports;
    /******/
    /******/
    // Create a new module (and put it into the cache)
    /******/
    var module = installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false
      };
    /******/
    /******/
    // Execute the module function
    /******/
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/
    // Flag the module as loaded
    /******/
    module.loaded = true;
    /******/
    /******/
    // Return the exports of the module
    /******/
    return module.exports;  /******/
  }
  /******/
  /******/
  /******/
  // expose the modules object (__webpack_modules__)
  /******/
  __webpack_require__.m = modules;
  /******/
  /******/
  // expose the module cache
  /******/
  __webpack_require__.c = installedModules;
  /******/
  /******/
  // __webpack_public_path__
  /******/
  __webpack_require__.p = '';
  /******/
  /******/
  // Load entry module and return exports
  /******/
  return __webpack_require__(0);  /******/
}([
  function (module, exports, __webpack_require__) {
    'use strict';
    var jquery = __webpack_require__(1);
    var angular = __webpack_require__(2);
    angular.module('bs-multi-selector', []);
    __webpack_require__(3);  /***/
  },
  function (module, exports, __webpack_require__) {
    module.exports = $;  /***/
  },
  function (module, exports, __webpack_require__) {
    module.exports = angular;  /***/
  },
  function (module, exports, __webpack_require__) {
    'use strict';
    var _ = __webpack_require__(4);
    var template = __webpack_require__(5);
    var defaultItemTemplate = __webpack_require__(6);
    __webpack_require__(7);
    angular.module('bs-multi-selector').directive('bsMultiSelector', [
      '$sce',
      '$timeout',
      function ($sce, $timeout) {
        return {
          restrict: 'E',
          scope: {
            source: '=',
            selectedItems: '=',
            template: '=',
            placeholder: '@'
          },
          template: template,
          link: function link(scope, el, attr) {
            var id = _.uniqueId();
            // This is a unique id associated with this component instance and used to namespace dom events.
            scope.showDialog = false;
            scope.highlightedIndex = null;
            /**
	    * Display the dialog. This is called when the main input is focused or clicked.
	    */
            scope.displayDialog = function () {
              scope.showDialog = true;
              // At the end of a timeout focus the input inside the dialog
              setTimeout(function () {
                el.find('.bs-multi-selector__dialog__input').focus();
              }, 100);
              positionDialog();
            };
            /**
	    * Update the main item template with on provided by the API or a default one.
	    */
            scope.$watch('template', function (value) {
              scope.itemTemplate = value || defaultItemTemplate;
            });
            /**
	    * Reset the highlighted index to null when the user inputs text.
	    */
            scope.$watch('userInput', function () {
              scope.highlightedIndex = null;
            });
            /**
	    * Toggle an item as selected. Also position the dialog accordingly because as we add and remove
	    * items the size of the primary input may change.
	    */
            scope.selectItem = function (item) {
              if (_.find(scope.selectedItems, item)) {
                scope.removeItem(item);
              } else {
                if (!scope.selectedItems) {
                  scope.selectedItems = [item];
                } else {
                  scope.selectedItems.push(item);
                }
              }
              positionDialog();
            };
            scope.removeItem = function (item) {
              scope.selectedItems = _.without(scope.selectedItems, item);
            };
            scope.isSelected = function (item) {
              return !!_.find(scope.selectedItems, item);
            };
            /**
	    * Keybord navigation logic
	    */
            scope.keyDown = function (e) {
              var keycode = e.which;
              if (keycode === 40) {
                // press down key
                if (_.isNull(scope.highlightedIndex)) {
                  scope.highlightedIndex = 0;
                } else {
                  if (scope.highlightedIndex < scope.filteredItems.length - 1) {
                    scope.highlightedIndex = scope.highlightedIndex + 1;
                  }
                }
              } else if (keycode === 38) {
                // press up key
                if (!scope.highlightedIndex) {
                  scope.highlightedIndex = 0;
                } else {
                  if (scope.highlightedIndex > 0) {
                    scope.highlightedIndex = scope.highlightedIndex - 1;
                  }
                }
              } else if (keycode === 13) {
                // press enter key
                if (!_.isNull(scope.highlightedIndex)) {
                  scope.selectItem(scope.filteredItems[scope.highlightedIndex]);
                }
              } else if (keycode === 27) {
                // press escape key
                scope.showDialog = false;
              }
            };
            /**
	    * We need to manually position the dialog because the size of the input may
	    * grow vertically based upon the quantity of pills within it.
	    */
            function positionDialog() {
              setTimeout(function () {
                var height = el.height();
                el.find('.bs-multi-selector__dialog').css({ top: height + 1 + 'px' });
              }, 100);
            }
            /**
	    * Setup jquery event listener on the body to know when to close the dialog.
	    * This event is name spaced so that we can correctly clean it up.
	    */
            $('body').on('click.bsmultiselector' + id, function (e) {
              if (!$(e.target).closest(el).length) {
                scope.$apply(function () {
                  scope.showDialog = false;
                });
              }
            });
            /** When the directive is removed, cleanup jquery events  **/
            scope.$on('$destroy', function () {
              $('body').off('click.bsmultiselector' + id);
            });
          }
        };
      }
    ]);
    /**
	 * This directive represents each "item" within the dropdown select list. It takes a template
	 * which defines its inner content. The template will be compiled with the parent scope.
	 *
	 * This allows the user to define a custom template. By default a template for selecting
	 * "people" is included.
	 */
    angular.module('bs-multi-selector').directive('bsMultiSelectorItem', [
      '$compile',
      function ($compile) {
        return {
          restrict: 'E',
          scope: { template: '=' },
          link: function link(scope, el, attr) {
            var childEl;
            scope.$watch('template', function (template) {
              if (template) {
                if (childEl)
                  childEl.remove();
                childEl = $compile(scope.template)(scope.$parent);
                el.append(childEl);
              }
            });
          }
        };
      }
    ]);  /***/
  },
  function (module, exports, __webpack_require__) {
    module.exports = _;  /***/
  },
  function (module, exports, __webpack_require__) {
    module.exports = '<div class="bs-multi-selector">\n\t<input type="input" class="bs-multi-selector__hidden-input" ng-focus="displayDialog()">\n\t<div ng-click="displayDialog()" type="text" class="bs-multi-selector__main-input form-control">\n\t\t<div class="bs-multi-selector__pill bss-gray-5 bss-bg-gray-10" ng-repeat="item in selectedItems">\n\t\t\t{{item.first_name}} {{item.last_name}} <i ng-click="removeItem(item)" class="bs-icon bs-icon-Close bss-medium-gray"></i>\n\t\t</div>\n\t</div>\n</div>\n<div class="bs-multi-selector__dialog depth-z2" ng-show="showDialog">\n\t<input type="text" ng-keydown="keyDown($event)" class="form-control bs-multi-selector__dialog__input" ng-model="userInput" placeholder="{{placeholder}}"/>\n\t<div class="bs-multi-selector__dialog__items">\n\t\t<bs-multi-selector-item ng-class="{\'+selected\': isSelected(item), \'+highlighted\': ($index === highlightedIndex) }" ng-click="selectItem(item)" ng-repeat="item in filteredItems = (source | limitTo:4 | filter:userInput)" template="itemTemplate">\n\t\t</bs-multi-selector-item>\n\t</div>\n</div>\n';  /***/
  },
  function (module, exports, __webpack_require__) {
    module.exports = '<div class="bs-multi-selector-item__icon bss-bg-medium-gray bss-gray-5">\n\t{{item.first_name[0]}}{{item.last_name[0]}}\n</div>\n<div class="bs-multi-selector-item__title">\n\t{{item.first_name}} {{item.last_name}}\n</div>\n<div class="bs-multi-selector-item__check">\n\t<i class="bs-icon bs-icon-LargeCheck bss-info"></i>\n</div>\n';  /***/
  },
  function (module, exports, __webpack_require__) {
    // style-loader: Adds some css to the DOM by adding a <style> tag
    // load the styles
    var content = __webpack_require__(8);
    if (typeof content === 'string')
      content = [[
          module.id,
          content,
          ''
        ]];
    // add the styles to the DOM
    var update = __webpack_require__(9)(content, {});
    // Hot Module Replacement
    if (false) {
      // When the styles change, update the <style> tags
      module.hot.accept('!!/home/blittle/dev/bs-multi-selector/node_modules/css-loader/index.js!/home/blittle/dev/bs-multi-selector/node_modules/autoprefixer-loader/index.js!/home/blittle/dev/bs-multi-selector/src/multi-selector.css', function () {
        var newContent = require('!!/home/blittle/dev/bs-multi-selector/node_modules/css-loader/index.js!/home/blittle/dev/bs-multi-selector/node_modules/autoprefixer-loader/index.js!/home/blittle/dev/bs-multi-selector/src/multi-selector.css');
        if (typeof newContent === 'string')
          newContent = [[
              module.id,
              newContent,
              ''
            ]];
        update(newContent);
      });
      // When the module is disposed, remove the <style> tags
      module.hot.dispose(function () {
        update();
      });
    }  /***/
  },
  function (module, exports, __webpack_require__) {
    exports = module.exports = __webpack_require__(10)();
    exports.push([
      module.id,
      'bs-multi-selector {\n\tdisplay: inline-block;\n\tposition: relative;\n\tfont-size: 1.4rem;\n}\n\n.bs-multi-selector {\n\twidth: 340px;\n\tz-index: 1;\n}\n\n.bs-multi-selector__hidden-input {\n\tposition: absolute;\n}\n\n.bs-multi-selector__dialog {\n\tbackground: white;\n\tpadding: 16px 16px 8px 16px;\n\tposition: absolute;\n\ttop: 33px;\n\tmin-width: 298px;\n\twidth: auto;\n\tborder-radius: 2px;\n}\n\n.bs-multi-selector__dialog__items {\n\tmargin: 16px -16px 8px -16px;\n}\n\nbs-multi-selector-item {\n\tdisplay: block;\n\theight: 40px;\n\tposition: relative;\n\tpadding-top: 6px;\n\tcursor: pointer;\n\tpadding-left: 16px;\n\tpadding-right: 16px;\n}\n\nbs-multi-selector-item:hover, bs-multi-selector-item.\\+highlighted {\n\tbackground-color: #F7F7F7;\n}\n\nbs-multi-selector-item.\\+selected .bs-multi-selector-item__icon {\n\tbackground-color: #45A8F8!important;\n}\n\nbs-multi-selector-item.\\+selected .bs-multi-selector-item__check {\n\tvisibility: visible;\n}\n\n.bs-multi-selector-item__icon {\n\tdisplay:inline-block;\n\tvertical-align: middle;\n\theight: 28px;\n\twidth: 28px;\n\ttext-align: center;\n\tfont-weight: 600;\n\tpadding-top: .6rem;\n\tborder-radius: 2px;\n}\n\n.bs-multi-selector-item__title {\n\tdisplay:inline-block;\n\tposition: absolute;\n\tleft: 56px;\n\ttop: 12px;\n}\n\n.bs-multi-selector-item__check {\n\tdisplay:inline-block;\n\tvisibility: hidden;\n\tfloat:right;\n\tfont-size: 2.6rem;\n\tposition: relative;\n\tright: .2rem;\n}\n\n.bs-multi-selector__main-input.form-control {\n\tposition: relative;\n\tz-index: 2;\n\tpadding: 2px 2px 0 2px;\n\tmin-height: 32px;\n\theight: auto;\n}\n\n.bs-multi-selector__pill {\n\tdisplay: inline-block;\n\tpadding: 2px 8px;\n\tmargin-right: 5px;\n\theight: 25px;\n\tmargin-bottom: 3px;\n}\n\n.bs-multi-selector__pill .bs-icon {\n\tposition: relative;\n\ttop: 1px;\n\tcursor: pointer;\n}\n',
      ''
    ]);  /***/
  },
  function (module, exports, __webpack_require__) {
    /*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
    var stylesInDom = {}, memoize = function (fn) {
        var memo;
        return function () {
          if (typeof memo === 'undefined')
            memo = fn.apply(this, arguments);
          return memo;
        };
      }, isIE9 = memoize(function () {
        return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
      }), getHeadElement = memoize(function () {
        return document.head || document.getElementsByTagName('head')[0];
      }), singletonElement = null, singletonCounter = 0;
    module.exports = function (list, options) {
      if (false) {
        if (typeof document !== 'object')
          throw new Error('The style-loader cannot be used in a non-browser environment');
      }
      options = options || {};
      // Force single-tag solution on IE9, which has a hard limit on the # of <style>
      // tags it will allow on a page
      if (typeof options.singleton === 'undefined')
        options.singleton = isIE9();
      var styles = listToStyles(list);
      addStylesToDom(styles, options);
      return function update(newList) {
        var mayRemove = [];
        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];
          domStyle.refs--;
          mayRemove.push(domStyle);
        }
        if (newList) {
          var newStyles = listToStyles(newList);
          addStylesToDom(newStyles, options);
        }
        for (var i = 0; i < mayRemove.length; i++) {
          var domStyle = mayRemove[i];
          if (domStyle.refs === 0) {
            for (var j = 0; j < domStyle.parts.length; j++)
              domStyle.parts[j]();
            delete stylesInDom[domStyle.id];
          }
        }
      };
    };
    function addStylesToDom(styles, options) {
      for (var i = 0; i < styles.length; i++) {
        var item = styles[i];
        var domStyle = stylesInDom[item.id];
        if (domStyle) {
          domStyle.refs++;
          for (var j = 0; j < domStyle.parts.length; j++) {
            domStyle.parts[j](item.parts[j]);
          }
          for (; j < item.parts.length; j++) {
            domStyle.parts.push(addStyle(item.parts[j], options));
          }
        } else {
          var parts = [];
          for (var j = 0; j < item.parts.length; j++) {
            parts.push(addStyle(item.parts[j], options));
          }
          stylesInDom[item.id] = {
            id: item.id,
            refs: 1,
            parts: parts
          };
        }
      }
    }
    function listToStyles(list) {
      var styles = [];
      var newStyles = {};
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var id = item[0];
        var css = item[1];
        var media = item[2];
        var sourceMap = item[3];
        var part = {
            css: css,
            media: media,
            sourceMap: sourceMap
          };
        if (!newStyles[id])
          styles.push(newStyles[id] = {
            id: id,
            parts: [part]
          });
        else
          newStyles[id].parts.push(part);
      }
      return styles;
    }
    function createStyleElement() {
      var styleElement = document.createElement('style');
      var head = getHeadElement();
      styleElement.type = 'text/css';
      head.appendChild(styleElement);
      return styleElement;
    }
    function addStyle(obj, options) {
      var styleElement, update, remove;
      if (options.singleton) {
        var styleIndex = singletonCounter++;
        styleElement = singletonElement || (singletonElement = createStyleElement());
        update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
        remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
      } else {
        styleElement = createStyleElement();
        update = applyToTag.bind(null, styleElement);
        remove = function () {
          styleElement.parentNode.removeChild(styleElement);
        };
      }
      update(obj);
      return function updateStyle(newObj) {
        if (newObj) {
          if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
            return;
          update(obj = newObj);
        } else {
          remove();
        }
      };
    }
    function replaceText(source, id, replacement) {
      var boundaries = [
          '/** >>' + id + ' **/',
          '/** ' + id + '<< **/'
        ];
      var start = source.lastIndexOf(boundaries[0]);
      var wrappedReplacement = replacement ? boundaries[0] + replacement + boundaries[1] : '';
      if (source.lastIndexOf(boundaries[0]) >= 0) {
        var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
        return source.slice(0, start) + wrappedReplacement + source.slice(end);
      } else {
        return source + wrappedReplacement;
      }
    }
    function applyToSingletonTag(styleElement, index, remove, obj) {
      var css = remove ? '' : obj.css;
      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
      } else {
        var cssNode = document.createTextNode(css);
        var childNodes = styleElement.childNodes;
        if (childNodes[index])
          styleElement.removeChild(childNodes[index]);
        if (childNodes.length) {
          styleElement.insertBefore(cssNode, childNodes[index]);
        } else {
          styleElement.appendChild(cssNode);
        }
      }
    }
    function applyToTag(styleElement, obj) {
      var css = obj.css;
      var media = obj.media;
      var sourceMap = obj.sourceMap;
      if (sourceMap && typeof btoa === 'function') {
        try {
          css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(JSON.stringify(sourceMap)) + ' */';
          css = '@import url("data:text/css;base64,' + btoa(css) + '")';
        } catch (e) {
        }
      }
      if (media) {
        styleElement.setAttribute('media', media);
      }
      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
      } else {
        while (styleElement.firstChild) {
          styleElement.removeChild(styleElement.firstChild);
        }
        styleElement.appendChild(document.createTextNode(css));
      }
    }  /***/
  },
  function (module, exports, __webpack_require__) {
    module.exports = function () {
      var list = [];
      list.toString = function toString() {
        var result = [];
        for (var i = 0; i < this.length; i++) {
          var item = this[i];
          if (item[2]) {
            result.push('@media ' + item[2] + '{' + item[1] + '}');
          } else {
            result.push(item[1]);
          }
        }
        return result.join('');
      };
      return list;
    }  /***/;
  }  /******/
]));