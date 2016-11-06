(function(){

	"use strict";

	angular
		.module("ngClassifieds")
		.directive("classifiedCard", function() {
			return {
				templateUrl: "components/classifieds/card/classified-card.tpl.html",
				//template: "<h1>Test</h1>",
				scope: {
					classifieds: "=classifieds",
					classifiedsFilter: "=classifiedsFilter",
					category: "=category"
				},
				controller: classifiedCardController,
				controllerAs: "vm"
			}

			function classifiedCardController($state, $scope, $mdDialog) {
				
				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;
				console.log("classifieds directive" + vm.classifiedFilter)

				function editClassified(classified) {
	      			$state.go('classifieds.edit', {
	                              id: classified.$id
	                        });
	      		}

	      		function deleteClassified(event, classified) {
	      			var confirm = $mdDialog.confirm()
	      			    .title('Are you sure you want to delete ' + classified.title + '?')
	      			    .ok('Yes')
	      			    .cancel('No')
	      			    .targetEvent(event);
	      			$mdDialog.show(confirm).then(function() {
	                              vm.classifieds.$remove(classified);
	                              showToast('Classsified Deleted!');
	      				//var index = vm.classifieds.indexOf(classified);
	      				//vm.classifieds.splice(index, 1);
	      			}, function() {
	      				// If user clicks cancel put the code here for what needs to be done
	      			});
	      		}

	      		function showToast(message) {
	      			$mdToast.show(
	      					$mdToast.simple()
	      						.content(message)
	      						.position('top, right')
	      						.hideDelay(3000)
	      					);
	      		}

	      	}
		})

})();