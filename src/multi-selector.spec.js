describe('multi-selector', function() {
	var elm, scope, input;

	beforeEach(module('cp-multi-selector'));

	beforeEach(inject(function($rootScope, $compile, $filter) {
		elm = angular.element(
			'<div style="position: relative;">' +
				'<cp-multi-selector single icon="cps-icon-filter" source="source" selected-items="selectedItems" template="template" placeholder="Type a collaborators name...">test</cp-multi-selector>' +
			'</div>'
		);

		$('body').append(elm);

		scope = $rootScope.$new();
		//scope.template = "<p ng-bind='item.first_name'>test</p>";

		scope.source = [
			{
				"last_name": "William",
				"first_name": "Seward"
			},
			{
				"last_name": "Montgomery",
				"first_name": "Blair"
			},
			{
				"last_name": "Meriwether",
				"first_name": "Lewis"
			}
		];

		scope.selectedItems = [];

		$compile(elm)(scope);
		scope.$digest();
	}));

	afterEach(function() {
		//elm.remove();
	});

	it('Should boot', function() {
		expect(1).toBe(1);
	});
});
