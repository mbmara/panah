(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("headerController",headerController);

		//Dependency
		headerController.$inject = ['UserFactory','$timeout'];

		function headerController(UserFactory, $timeout){
            var vm = this;
            $timeout( function(){
            	vm.name = UserFactory.name;
            	vm.user_id = UserFactory.user_id;
            },500)

            vm.logout = logout;

            function logout(){
            	UserFactory.logout();
            }
            
		}
})()