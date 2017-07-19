(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("bodyController",bodyController);

		//Dependency
		bodyController.$inject = [];

		function bodyController(){
			var vm = this;

			vm.name = "ramel";
		}
})()