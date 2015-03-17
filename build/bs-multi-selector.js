/*!
 * bs-multi-selector
 * author: Bret Little
 * copyright: 2015
 * license: MIT
 * version: 1.0.0
 */
!function(e){function t(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return e[s].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){"use strict";var s=(i(1),i(2));s.module("bs-multi-selector",[]),i(3)},function(e){e.exports=$},function(e){e.exports=angular},function(e,t,i){"use strict";var s=i(4),n=i(5),l=i(6);i(7),angular.module("bs-multi-selector").directive("bsMultiSelector",["$sce","$timeout",function(){return{restrict:"E",scope:{source:"=",selectedItems:"=",template:"=",placeholder:"@"},template:n,link:function(e,t){function i(){setTimeout(function(){var e=t.height();t.find(".bs-multi-selector__dialog").css({top:e+1+"px"})},100)}var n=s.uniqueId();e.showDialog=!1,e.highlightedIndex=null,e.displayDialog=function(){e.showDialog=!0,setTimeout(function(){t.find(".bs-multi-selector__dialog__input").focus()},100),i()},e.$watch("template",function(t){e.itemTemplate=t||l}),e.$watch("userInput",function(){e.highlightedIndex=null}),e.selectItem=function(t){s.find(e.selectedItems,t)?e.removeItem(t):e.selectedItems?e.selectedItems.push(t):e.selectedItems=[t],i()},e.removeItem=function(t){e.selectedItems=s.without(e.selectedItems,t)},e.isSelected=function(t){return!!s.find(e.selectedItems,t)},e.keyDown=function(t){var i=t.which;40===i?s.isNull(e.highlightedIndex)?e.highlightedIndex=0:e.highlightedIndex<e.filteredItems.length-1&&(e.highlightedIndex=e.highlightedIndex+1):38===i?e.highlightedIndex?e.highlightedIndex>0&&(e.highlightedIndex=e.highlightedIndex-1):e.highlightedIndex=0:13===i?s.isNull(e.highlightedIndex)||e.selectItem(e.filteredItems[e.highlightedIndex]):27===i&&(e.showDialog=!1)},$("body").on("click.bsmultiselector"+n,function(i){$(i.target).closest(t).length||e.$apply(function(){e.showDialog=!1})}),e.$on("$destroy",function(){$("body").off("click.bsmultiselector"+n)})}}}]),angular.module("bs-multi-selector").directive("bsMultiSelectorItem",["$compile",function(e){return{restrict:"E",scope:{template:"="},link:function(t,i){var s;t.$watch("template",function(n){n&&(s&&s.remove(),s=e(t.template)(t.$parent),i.append(s))})}}}])},function(e){e.exports=_},function(e){e.exports='<div class=bs-multi-selector><input type=input class=bs-multi-selector__hidden-input ng-focus=displayDialog()><div ng-click=displayDialog() type=text class="bs-multi-selector__main-input form-control"><div class="bs-multi-selector__pill bss-gray-5 bss-bg-gray-10" ng-repeat="item in selectedItems">{{item.first_name}} {{item.last_name}} <i ng-click=removeItem(item) class="bs-icon bs-icon-Close bss-medium-gray"></i></div></div></div><div class="bs-multi-selector__dialog depth-z2" ng-show=showDialog><input ng-keydown=keyDown($event) class="form-control bs-multi-selector__dialog__input" ng-model=userInput placeholder={{placeholder}}><div class=bs-multi-selector__dialog__items><bs-multi-selector-item ng-class="{\'+selected\': isSelected(item), \'+highlighted\': ($index === highlightedIndex) }" ng-click=selectItem(item) ng-repeat="item in filteredItems = (source | limitTo:4 | filter:userInput)" template=itemTemplate></bs-multi-selector-item></div></div>'},function(e){e.exports='<div class="bs-multi-selector-item__icon bss-bg-medium-gray bss-gray-5">{{item.first_name[0]}}{{item.last_name[0]}}</div><div class=bs-multi-selector-item__title>{{item.first_name}} {{item.last_name}}</div><div class=bs-multi-selector-item__check><i class="bs-icon bs-icon-LargeCheck bss-info"></i></div>'},function(e,t,i){var s=i(8);"string"==typeof s&&(s=[[e.id,s,""]]);i(9)(s,{})},function(e,t,i){t=e.exports=i(10)(),t.push([e.id,"bs-multi-selector{display:inline-block;position:relative;font-size:1.4rem}.bs-multi-selector{width:340px;z-index:1}.bs-multi-selector__hidden-input{position:absolute}.bs-multi-selector__dialog{background:#fff;padding:16px 16px 8px;position:absolute;top:33px;min-width:298px;width:auto;border-radius:2px}.bs-multi-selector__dialog__items{margin:16px -16px 8px}bs-multi-selector-item{display:block;height:40px;position:relative;padding-top:6px;cursor:pointer;padding-left:16px;padding-right:16px}bs-multi-selector-item:hover,bs-multi-selector-item.\\+highlighted{background-color:#F7F7F7}bs-multi-selector-item.\\+selected .bs-multi-selector-item__icon{background-color:#45A8F8!important}bs-multi-selector-item.\\+selected .bs-multi-selector-item__check{visibility:visible}.bs-multi-selector-item__icon{display:inline-block;vertical-align:middle;height:28px;width:28px;text-align:center;font-weight:600;padding-top:.6rem;border-radius:2px}.bs-multi-selector-item__title{display:inline-block;position:absolute;left:56px;top:12px}.bs-multi-selector-item__check{display:inline-block;visibility:hidden;float:right;font-size:2.6rem;position:relative;right:.2rem}.bs-multi-selector__main-input.form-control{position:relative;z-index:2;padding:2px 2px 0;min-height:32px;height:auto}.bs-multi-selector__pill{display:inline-block;padding:2px 8px;margin-right:5px;height:25px;margin-bottom:3px}.bs-multi-selector__pill .bs-icon{position:relative;top:1px;cursor:pointer}",""])},function(e){function t(e,t){for(var i=0;i<e.length;i++){var s=e[i],l=c[s.id];if(l){l.refs++;for(var o=0;o<l.parts.length;o++)l.parts[o](s.parts[o]);for(;o<s.parts.length;o++)l.parts.push(n(s.parts[o],t))}else{for(var r=[],o=0;o<s.parts.length;o++)r.push(n(s.parts[o],t));c[s.id]={id:s.id,refs:1,parts:r}}}}function i(e){for(var t=[],i={},s=0;s<e.length;s++){var n=e[s],l=n[0],o=n[1],r=n[2],c=n[3],a={css:o,media:r,sourceMap:c};i[l]?i[l].parts.push(a):t.push(i[l]={id:l,parts:[a]})}return t}function s(){var e=document.createElement("style"),t=u();return e.type="text/css",t.appendChild(e),e}function n(e,t){var i,n,l;if(t.singleton){var c=m++;i=p||(p=s()),n=o.bind(null,i,c,!1),l=o.bind(null,i,c,!0)}else i=s(),n=r.bind(null,i),l=function(){i.parentNode.removeChild(i)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else l()}}function l(e,t,i){var s=["/** >>"+t+" **/","/** "+t+"<< **/"],n=e.lastIndexOf(s[0]),l=i?s[0]+i+s[1]:"";if(e.lastIndexOf(s[0])>=0){var o=e.lastIndexOf(s[1])+s[1].length;return e.slice(0,n)+l+e.slice(o)}return e+l}function o(e,t,i,s){var n=i?"":s.css;if(e.styleSheet)e.styleSheet.cssText=l(e.styleSheet.cssText,t,n);else{var o=document.createTextNode(n),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(o,r[t]):e.appendChild(o)}}function r(e,t){var i=t.css,s=t.media,n=t.sourceMap;if(n&&"function"==typeof btoa)try{i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(JSON.stringify(n))+" */",i='@import url("data:text/css;base64,'+btoa(i)+'")'}catch(l){}if(s&&e.setAttribute("media",s),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var c={},a=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},d=a(function(){return/msie 9\b/.test(window.navigator.userAgent.toLowerCase())}),u=a(function(){return document.head||document.getElementsByTagName("head")[0]}),p=null,m=0;e.exports=function(e,s){s=s||{},"undefined"==typeof s.singleton&&(s.singleton=d());var n=i(e);return t(n,s),function(e){for(var l=[],o=0;o<n.length;o++){var r=n[o],a=c[r.id];a.refs--,l.push(a)}if(e){var d=i(e);t(d,s)}for(var o=0;o<l.length;o++){var a=l[o];if(0===a.refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete c[a.id]}}}}},function(e){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var i=this[t];e.push(i[2]?"@media "+i[2]+"{"+i[1]+"}":i[1])}return e.join("")},e}}]);