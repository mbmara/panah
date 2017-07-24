(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("homeController",homeController);

		//Dependency
		homeController.$inject = ['userInit','HomeFactory','DocumentFactory'];

		function homeController(userInit, HomeFactory,DocumentFactory){
			var home = this;

			HomeFactory.init( function(res){
				home.data = res.data.payload;
			});

			home.goSearch = function(searchStr){
				DocumentFactory.search({search:searchStr}, function(res){
					home.data.results = res.data;
				});
			}
			
		}


})()