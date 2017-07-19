(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("headerController",headerController);

		//Dependency
		headerController.$inject = [];

		function headerController(){
            var vm = this;

            vm.name = "ramel";
		}
})()