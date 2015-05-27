# cp-multi-selector
A widget for canopy in selecting multiple entities from a selection drop-down.

## Requirements
 - Angular 1.3
 - Lodash
 - jQuery
 
## Installation
1. Install through npm `npm install --save cp-multi-selector`
2. Make sure your app depends upon 'cp-multi-selector':
```javascript
angular.module('app', ['cp-multi-selector']);
```

## Usage
### Markup:
```html
<cp-multi-selector 
  source="source" 
  selected-items="selectedItems" 
  placeholder="Type a collaborators name...">
</cp-multi-selector>
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
[The default template](https://github.com/canopytax/cp-multi-selector/blob/master/src/default-item-template.html)

## Demo
http://canopytax.github.io/cp-multi-selector/
