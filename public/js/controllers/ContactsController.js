angular.module('contatooh').controller('ContactsController',function($scope, $resource, $http) {	
	var Contacts     = $resource('/contacts/:id');
	$scope.filtering = '';
	$scope.contacts  = [];
	$scope.message   = '';		
	// Initialize
	function init() {
		getContacts();	
	} 	
	// Get Contacts list
	function getContacts() {		
		Contacts.query (
			function(contacts) {
				$scope.contacts = contacts;
				$scope.message  = '';
			},
			function(statusText) {
				$scope.message = 'It could not get the Contact list'
				console.log(statusText);
			}
		);
	}   
	// Remove Contact  
	$scope.remove = function(contact) {  				
		Contacts.delete({ id: contact._id }, 
			function(contact) {
				var indexCon = '';								
				$scope.contacts.forEach(function(field) {
					if(contact._id == field._id)
						indexCon = $scope.contacts.indexOf(field);		
				});								
				$scope.contacts.splice(indexCon, 1);  
				$scope.message = 'Contact ' + contact.name + ' successfully removed';
			},
			function(error) {
				$scope.message = 'It could not remove Contact';
				console.log(error);				
			}
		);
	};
	// Run methods	
	init();
});   