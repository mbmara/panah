(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("tagDocController",tagDocController);

		//Dependency
		tagDocController.$inject = ['DocumentFactory','$state','$window'];

		function tagDocController(DocumentFactory, $state, $window){
			
			var docTag = this;
			var tag = $state.params.tag || "";

			docTag.goBack = function(){
				 $window.history.back();
			}
			DocumentFactory.getTagMatches(tag, function(res){
				docTag.results = res.data.results;
			})

		}


})()