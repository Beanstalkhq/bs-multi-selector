# bs-multi-selector
A widget for beanstalk in selecting multiple entities from a selection drop-down.

## Requirements
 - Angular 1.3
 - Lodash
 - jQuery
 
## Installation
1. Install through npm `npm install --save bs-multi-selector`
2. Make sure your app depends upon 'bs-multi-selector':
```javascript
angular.module('app', ['bs-multi-selector']);
```

## Usage
### Markup:
```html
<bs-multi-selector 
  source="source" 
  selected-items="selectedItems" 
  placeholder="Type a collaborators name...">
</bs-multi-selector>
```
### Scope:
```javascript
$scope.source = [{
    "last_name": "William",
    "first_name": "Seward"
}, {
    "last_name": "Montgomery",
    "first_name": "Blair"
}, {
    "last_name": "Meriwether",
    "first_name": "Lewis"
}];

$scope.selectedItems = [];
```

Optionally pass a string "template" to the directive which will be used for a custom list element in the drop down window.
[The default template](https://github.com/Beanstalkhq/bs-multi-selector/blob/master/src/default-item-template.html)

## Demo
http://beanstalkhq.github.io/bs-multi-selector/
