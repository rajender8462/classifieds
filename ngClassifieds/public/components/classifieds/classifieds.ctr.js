(function() {

  "use strict";

  angular
      .module("ngClassifieds")                  // We are getting a reference of the module we already created. Hence not adding []
      .controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){

      		var vm = this;

      		vm.categories;
      		vm.classified;
      		vm.classifieds;
      		vm.closeSidebar = closeSidebar;
      		vm.deleteClassified = deleteClassified;
      		vm.editing;
      		vm.editClassified = editClassified;
      		vm.openSidebar = openSidebar;
      		vm.saveClassified = saveClassified;
      		vm.saveEdit = saveEdit;

                  vm.classifieds = classifiedsFactory.ref;
                  // $loaded is firebase function
                  vm.classifieds.$loaded().then(function(classifieds) {
                        vm.categories = getCategories(classifieds);
                  });
      		//classifiedsFactory.getClassifieds().then(function(classifieds){
      		//	vm.classifieds = classifieds.data;
      		//	vm.categories = getCategories(vm.classifieds);
      		//});

                  $scope.$on('newClassified', function(event, classified){
                        vm.classifieds.$add(classified);
                        //classified.id = vm.classifieds.length +1;
                        //vm.classifieds.push(classified);
                        showToast('Classified Saved!');
                  })

                  $scope.$on('editSaved', function(event, message){
                        showToast(message);
                  })

      		var contact = {
      			name: "Kumar Kalra",
      			phone: "1231231234",
      			email: "kk@gmail.com"
      		}

      		

      		function openSidebar() {
      			// left means md component id which we set left on hmtl
      			$state.go('classifieds.new');
      		}

      		function closeSidebar() {
      			// left means md component id which we set left on hmtl
      			$mdSidenav('left').close();
      		}

      		function saveClassified(classified){
      			if(classified){
      				classified.contact = contact;
      				vm.classifieds.push(classified);
      				vm.classified = {};
      				closeSidebar();
      				showToast("Classified Saved!");
      			}
      			
      		}

      		function editClassified(classified) {
      			$state.go('classifieds.edit', {
                              id: classified.$id
                        });
      		}

      		function saveEdit() {
      			vm.editing = false;
      			vm.classified = {};
      			closeSidebar();
      			showToast("Edit Saved!");
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

      		function getCategories(classifieds) {
      			var categories = [];

      			angular.forEach(classifieds, function(item) {
      				angular.forEach(item.categories, function(category){
      					categories.push(category);
      				});
      			});

      			return _.uniq(categories);
      		}

                  /*var data = [
                  {
                        "id":"1",
                        "title":"Honda accord 2008",
                        "image": "http://automobiles.honda.com/images/2016/accord-sedan/overview-colors/MS.jpg",
                        "item": "First Item",
                        "price": "10000",
                        "posted": "2014-10-19",
                        "desc": " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        "contact":{
                              "name":"Kumar Kalra",
                              "phone":"(123) 123-1234",
                              "email":"xyz@gmail.com"
                        },
                        "categories":[
                              "Car",
                              "Parts and Accessories",
                              "Vehicle"
                        ]
                  }
                  
                  ]

                  var firebase = classifiedsFactory.ref;

                  angular.forEach(data, function(item){
                        firebase.$add(item);                        
                  });*/
      });
})();