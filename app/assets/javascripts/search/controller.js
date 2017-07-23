(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("searchController",searchController);

		//Dependency
		searchController.$inject = ['DocumentFactory'];


		function searchController(DocumentFactory){
           	var searchDoc = this;

           	searchDoc.data={
           		
           	}
           	searchDoc.decisions = [
                {value:'decision', label:'Decision'},
                {value:'opinion', label:'Opinion'}
            ];

           	searchDoc.searchWindow = true;
           	searchDoc.toggle = function(){
           		searchDoc.searchWindow = !searchDoc.searchWindow;
           	};
            	
            searchDoc.search = function(){
            	DocumentFactory.search(searchDoc.data, function(res){
            		searchDoc.result = res.data;	
            	})
            }
		}
})()